import "antd/lib/icon/style";
import "antd/lib/input-number/style";
import "antd/lib/input/style";
import "antd/lib/message/style";
import "antd/lib/select/style";
import "antd/lib/spin/style";

import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import message from "antd/lib/message";
import Select from "antd/lib/select";
import Spin from "antd/lib/spin";
import React, { useState } from "react";

import { EditOutlined } from "@ant-design/icons";
import { Size } from "../form-modal/types";

import { InputProps as AntdInputProps } from "antd/lib/input";
import { InputNumberProps as AntdInputNumberProps } from "antd/lib/input-number";
import { SelectProps as FromModalSelectProps } from "../form-modal/types";

declare type InputProps = Omit<
  AntdInputProps,
  "onChange" | "value" | "size" | "onBlur" | "onPressEnter" | "autoFocus"
>;

declare type InputNumberProps = Omit<
  AntdInputNumberProps,
  "onChange" | "value" | "size" | "onBlur" | "onPressEnter" | "autoFocus"
>;

declare type SelectProps = Omit<
  FromModalSelectProps,
  "size" | "onBlur" | "onSelect" | "value" | "autoFocus"
>;

export declare type SharedDataEntryProps = InputProps | InputNumberProps | SelectProps;

export interface EditableTextComponentProps {
  children: string;
  onOk: (value: any) => Promise<any>;
  needOnOkLoading?: boolean;
  size?: Size;
  style?: "link" | "text";
  type?: "input" | "inputNumber" | "select";
  rule?: "string" | "email";
  rootStyle?: React.CSSProperties;
  props?: SharedDataEntryProps;
}

const Option = Select.Option;

// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validate(rule: string, value: any) {
  // 空字符串恒返回 true
  if (!value) return true;

  if (rule === "email") {
    const test = emailRegex.test(value);
    if (!test) message.error("邮箱地址格式不正确");
    return test;
  } else {
    return true;
  }
}

const EditableText: React.FC<EditableTextComponentProps> = ({
  children,
  onOk,
  size = "middle",
  style = "link",
  type = "input",
  rule = "string",
  needOnOkLoading = true,
  rootStyle,
  props,
}) => {
  const [editable, setEditable] = useState(false);
  const [itemValue, setItemValue] = useState(children);
  const [text, setText] = useState(children);
  const [spinning, setSpinning] = useState(false);

  function onBlur() {
    if (validate(rule, itemValue)) {
      setEditable(false);
      setSpinning(true);

      const promise = onOk(itemValue);
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      if (promise) {
        promise
          .then(() => {
            setText(itemValue);
            setSpinning(false);
          })
          .catch(() => {
            setSpinning(false);
          });
      } else {
        setSpinning(false);
      }
    }
  }

  function onChange(value: any) {
    setItemValue(value);
  }

  let element: React.ReactElement;

  if (editable) {
    if (type === "inputNumber") {
      element = (
        <InputNumber
          size={size}
          onBlur={onBlur}
          onPressEnter={onBlur}
          value={Number(itemValue) || 0}
          onChange={onChange}
          autoFocus
          {...(props as InputNumberProps)}
        />
      );
    } else if (type === "select") {
      const { options, ...etc } = props as SelectProps;
      element = (
        <Select
          size={size}
          style={{ width: "100%" }}
          onBlur={onBlur}
          onChange={onChange}
          value={itemValue}
          autoFocus
          {...etc}
        >
          {options.map(({ label, value, disabled = false }) => (
            <Option value={value} key={value} disabled={disabled}>
              {label}
            </Option>
          ))}
        </Select>
      );
    } else {
      element = (
        <Input
          size={size}
          onBlur={onBlur}
          onPressEnter={onBlur}
          value={itemValue}
          onChange={onChange}
          autoFocus
          {...(props as InputProps)}
        />
      );
    }
  } else {
    if (style === "link") {
      element = (
        <div style={rootStyle}>
          <a onClick={() => setEditable(true)}>{text}</a>
        </div>
      );
    } else {
      element = (
        <div style={rootStyle}>
          <span>{text}</span>
          <a onClick={() => setEditable(true)} style={{ marginLeft: 4 }}>
            <EditOutlined />
          </a>
        </div>
      );
    }
  }

  return needOnOkLoading ? (
    <Spin size={size === "middle" ? "default" : size} spinning={spinning}>
      {element}
    </Spin>
  ) : (
    element
  );
};

export default EditableText;
