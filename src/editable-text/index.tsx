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

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface EditableTextComponentProps {
  children: string;
  onOk: (value: any) => Promise<any>;
  needOnOkLoading?: boolean;
  size?: "small" | "default" | "large";
  textType?: "link" | "text";
  itemType?: "input" | "inputNumber" | "select";
  rule?: "string" | "email";
  options?: SelectOption[];
  [prop: string]: any;
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
  size = "default",
  textType = "link",
  itemType = "input",
  rule = "string",
  options = [],
  needOnOkLoading = true,
  ...props
}) => {
  const [editable, setEditable] = useState(false);
  const [itemValue, setItemValue] = useState(children);
  const [text, setText] = useState(children);
  const [spinning, setSpinning] = useState(false);

  function onBlur(e: any) {
    const value = e.target.value.trim();

    if (validate(rule, value)) {
      setEditable(false);
      setSpinning(true);

      const promise = onOk(value);
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      if (promise) {
        promise
          .then(() => {
            setText(value);
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

  function onChange(e: any) {
    setItemValue(e.target.value);
  }

  function onSelect(value: any) {
    setItemValue(value);
  }

  let element: React.ReactElement;

  if (editable) {
    if (itemType === "inputNumber") {
      element = (
        <InputNumber
          size={size}
          onBlur={onBlur}
          onPressEnter={onBlur}
          value={Number(itemValue) || 0}
          onChange={onChange}
          autoFocus
          {...props}
        />
      );
    } else if (itemType === "select") {
      element = (
        <Select
          size={size}
          style={{ width: "100%" }}
          onBlur={onBlur}
          onSelect={onSelect}
          value={itemValue}
          autoFocus
          {...props}
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
          {...props}
        />
      );
    }
  } else {
    if (textType === "link") {
      element = <a onClick={() => setEditable(true)}>{text}</a>;
    } else {
      element = (
        <div>
          <span>{text}</span>
          <a onClick={() => setEditable(true)} style={{ marginLeft: 4 }}>
            <EditOutlined />
          </a>
        </div>
      );
    }
  }

  return needOnOkLoading ? (
    <Spin size={size} spinning={spinning}>
      {element}
    </Spin>
  ) : (
    element
  );
};

export default EditableText;
