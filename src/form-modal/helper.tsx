import "antd/lib/button/style";
import "antd/lib/cascader/style";
import "antd/lib/date-picker/style";
import "antd/lib/input/style";
import "antd/lib/input-number/style";
import "antd/lib/select/style";
import "antd/lib/upload/style";
import "antd/lib/switch/style";

import Button from "antd/lib/button";
import Cascader, { CascaderProps } from "antd/lib/cascader";
import { ColProps } from "antd/lib/col";
import DatePicker from "antd/lib/date-picker";
import Form from "antd/lib/form";
import Input, { InputProps, TextAreaProps } from "antd/lib/input";
import InputNumber, { InputNumberProps } from "antd/lib/input-number";
import Select from "antd/lib/select";
import Switch, { SwitchProps } from "antd/lib/switch";
import Upload from "antd/lib/upload";
import React from "react";

import { UploadOutlined } from "@ant-design/icons";

import { FormItem, SelectProps, Size, UploadProps } from "./types";

const { TextArea } = Input;
const { Option } = Select;

export function renderFormItem(
  item: FormItem,
  size: Size,
  style: React.CSSProperties,
  rules: FormItem["rules"],
  hasFeedback?: boolean
) {
  const {
    type,
    field,
    placeholder,
    label,
    readonly = false,
    valuePropName,
    props,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rules: _,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    col,
    ...itemProps
  } = item;

  let formItem: React.ReactElement;

  switch (type) {
    case "textarea": {
      formItem = (
        <TextArea
          placeholder={placeholder}
          disabled={readonly}
          style={{ marginBottom: 0 }}
          {...(props as TextAreaProps)}
        />
      );
      break;
    }
    case "inputNumber": {
      formItem = (
        <InputNumber
          size={size}
          placeholder={placeholder}
          disabled={readonly}
          style={{ width: "100%" }}
          {...(props as InputNumberProps)}
        />
      );
      break;
    }
    case "password": {
      formItem = (
        <Input
          size={size}
          type="password"
          placeholder={placeholder}
          disabled={readonly}
          style={{ width: "100%" }}
          {...(props as InputProps)}
        />
      );
      break;
    }
    case "select": {
      const { options, ...etc } = props as SelectProps;
      formItem = (
        <Select
          size={size}
          placeholder={placeholder}
          disabled={readonly}
          style={{ width: "100%" }}
          {...etc}
        >
          {options.map(({ label: _label, value, ...opts }) => (
            <Option key={value} value={value} {...opts}>
              {_label}
            </Option>
          ))}
        </Select>
      );
      break;
    }
    case "searchableSelect": {
      const { options, ...etc } = props as SelectProps;
      formItem = (
        <Select
          placeholder={placeholder || label}
          style={{ width: "100%" }}
          size={size}
          allowClear
          showSearch
          disabled={readonly}
          filterOption={(input, option) =>
            option?.props.children
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          {...etc}
        >
          {options.map(({ label: _label, value }) => (
            <Option key={value} value={value}>
              {_label}
            </Option>
          ))}
        </Select>
      );
      break;
    }
    case "dynamicSelect": {
      const { options, ...etc } = props as SelectProps;
      formItem = (
        <Select
          showSearch
          allowClear
          size={size}
          showArrow={false}
          filterOption={false}
          defaultActiveFirstOption={false}
          notFoundContent={null}
          placeholder={placeholder}
          disabled={readonly}
          style={{ width: "100%" }}
          {...etc}
        >
          {options.map(({ label: _label, value }) => (
            <Option key={value} value={value}>
              {_label}
            </Option>
          ))}
        </Select>
      );
      break;
    }
    case "cascader": {
      formItem = (
        <Cascader
          size={size}
          changeOnSelect
          placeholder={placeholder}
          disabled={readonly}
          style={{ width: "100%" }}
          {...(props as CascaderProps)}
        />
      );
      break;
    }
    case "upload-excel": {
      const { onUpload, ...uploadProps } = props as UploadProps;
      formItem = (
        <Upload
          accept=".xlsx, .xls"
          customRequest={({ file, onSuccess, onError }) => {
            if (file) {
              onUpload(file)
                .then((data) => onSuccess(data, file))
                .catch(onError);
            }
          }}
          {...uploadProps}
        >
          <Button size={size} icon={<UploadOutlined />}>
            上传文件
          </Button>
        </Upload>
      );
      break;
    }
    case "time": {
      formItem = (
        <DatePicker
          size={size}
          placeholder={placeholder}
          disabled={readonly}
          style={{ width: "100%" }}
          {...(props as any)}
        />
      );
      break;
    }
    case "switch": {
      formItem = (
        <Switch
          size={size === "large" ? "default" : size}
          disabled={readonly}
          {...(props as SwitchProps)}
        />
      );
      break;
    }
    case "input":
    default: {
      formItem = (
        <Input
          size={size}
          placeholder={placeholder}
          disabled={readonly}
          {...(props as InputProps)}
        />
      );
    }
  }

  return (
    <Form.Item
      label={label}
      key={field}
      name={field}
      valuePropName={valuePropName}
      rules={rules}
      hasFeedback={hasFeedback}
      style={style}
      {...itemProps}
    >
      {formItem}
    </Form.Item>
  );
}
