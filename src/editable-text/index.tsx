import "antd/lib/icon/style";
import "antd/lib/input-number/style";
import "antd/lib/input/style";
import "antd/lib/message/style";
import "antd/lib/select/style";
import "antd/lib/spin/style";

import Input, { InputProps as AntdInputProps } from "antd/lib/input";
import InputNumber, { InputNumberProps as AntdInputNumberProps } from "antd/lib/input-number";
import message from "antd/lib/message";
import Select from "antd/lib/select";
import Spin from "antd/lib/spin";
import TreeSelect, { TreeSelectProps } from "antd/lib/tree-select";
import React, { useState } from "react";

import { EditOutlined } from "@ant-design/icons";

import { SelectProps as FromModalSelectProps, Size } from "../form-modal/types";

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

export declare type SharedDataEntryProps =
  | InputProps
  | InputNumberProps
  | SelectProps
  | TreeSelectProps<any>;

export declare type Type = "input" | "inputNumber" | "select" | "treeSelect";
export declare type Rule = "string" | "email";
export declare type Style = "link" | "text";
export declare type Value = string | number | string[];

export interface EditableTextComponentProps {
  initialValue: Value;
  onOk: (value: any) => Promise<any> | void;
  needOnOkLoading?: boolean;
  size?: Size;
  style?: Style;
  type?: Type;
  rule?: Rule;
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
  initialValue,
  onOk,
  size = "middle",
  style = "link",
  type = "input",
  rule = "string",
  needOnOkLoading = true,
  rootStyle,
  props,
  children,
}) => {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [spinning, setSpinning] = useState(false);

  function onBlur() {
    if (validate(rule, value)) {
      setEditable(false);
      setSpinning(true);

      const promise = onOk(value);
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      if (promise) {
        promise
          .then(() => {
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
    setValue(value);
  }

  let element: React.ReactElement;

  if (editable) {
    if (type === "inputNumber") {
      element = (
        <InputNumber
          size={size}
          onBlur={onBlur}
          onPressEnter={onBlur}
          value={Number(value) || 0}
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
          value={value}
          autoFocus
          {...etc}
        >
          {options.map(({ label: content, ...opts }) => (
            <Option key={opts.value} {...opts}>
              {content}
            </Option>
          ))}
        </Select>
      );
    } else if (type === "treeSelect") {
      element = (
        <TreeSelect
          size={size}
          style={{ width: "100%" }}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          allowClear={true}
          {...(props as TreeSelectProps<any>)}
        />
      );
    } else {
      element = (
        <Input
          size={size}
          onBlur={onBlur}
          onPressEnter={onBlur}
          value={value}
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
          <a onClick={() => setEditable(true)}>{children}</a>
        </div>
      );
    } else {
      element = (
        <div style={rootStyle}>
          <span>{children}</span>
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
