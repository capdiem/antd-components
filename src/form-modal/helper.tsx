import "antd/es/button/style";
import "antd/es/cascader/style";
import "antd/es/date-picker/style";
import "antd/es/input/style";
import "antd/es/input-number/style";
import "antd/es/select/style";
import "antd/es/upload/style";
import "antd/es/message/style";
import "antd/es/switch/style";

import Button from "antd/es/button";
import Cascader from "antd/es/cascader";
import DatePicker from "antd/es/date-picker";
import Input from "antd/es/input";
import InputNumber from "antd/es/input-number";
import message from "antd/es/message";
import Select from "antd/es/select";
import Switch from "antd/es/switch";
import Upload from "antd/es/upload";
import { CascaderOptionType } from "antd/lib/cascader";
import { RcFile, UploadProps } from "antd/lib/upload";
import React from "react";

import { UploadOutlined } from "@ant-design/icons";

import { PlainItem } from "./types";

const { TextArea } = Input;
const { Option } = Select;

export function renderItem(item: PlainItem) {
  const {
    type,
    field,
    placeholder,
    label,
    size = "default",
    options = [],
    readonly = false,
    showTime = false,
    ...props
  } = item;

  function beforeUploadExcel(file: RcFile) {
    const isXls =
      file.type === "application/vnd.ms-excel" ||
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/kset" ||
      file.type === "application/msexcel" ||
      file.type === "application/excel" ||
      file.type === "application/kswps" ||
      file.type === "application/ksdps" ||
      (file.type === "" && /xlsx|xls/.test(file.name));

    if (!isXls) {
      message.error("请上传Excel文件！");
    }

    return isXls;
  }

  switch (type) {
    case "textarea":
      return (
        <TextArea
          placeholder={placeholder}
          disabled={readonly}
          style={{ marginBottom: 0 }}
          {...props}
        />
      );

    case "inputNumber":
      return (
        <InputNumber
          size={size}
          placeholder={placeholder}
          disabled={readonly}
          style={{ width: "100%" }}
          {...props}
        />
      );

    case "password":
      return (
        <Input
          size={size}
          type="password"
          placeholder={placeholder}
          disabled={readonly}
          style={{ width: "100%" }}
          {...props}
        />
      );

    case "select":
      return (
        <Select
          size={size}
          placeholder={placeholder}
          disabled={readonly}
          style={{ width: "100%" }}
          {...props}
        >
          {options.map(({ label: _label, value, ...opts }) => (
            <Option key={value} value={value} {...opts}>
              {_label}
            </Option>
          ))}
        </Select>
      );

    case "searchableSelect":
      return (
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
          {...props}
        >
          {options.map(({ label: _label, value }) => (
            <Option key={value} value={value}>
              {_label}
            </Option>
          ))}
        </Select>
      );

    case "dynamicSelect":
      return (
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
          {...props}
        >
          {options.map(({ label: _label, value }) => (
            <Option key={value} value={value}>
              {_label}
            </Option>
          ))}
        </Select>
      );

    case "cascader":
      return (
        <Cascader
          size={size}
          changeOnSelect
          options={options as CascaderOptionType[]}
          placeholder={placeholder}
          disabled={readonly}
          style={{ width: "100%" }}
          {...props}
        />
      );

    case "upload-excel":
      return (
        <Upload accept=".xlsx, .xls" beforeUpload={beforeUploadExcel} {...(props as UploadProps)}>
          <Button size={size} icon={<UploadOutlined />}>
            上传文件
          </Button>
        </Upload>
      );

    case "time":
      return (
        <DatePicker
          size={size}
          placeholder={placeholder}
          disabled={readonly}
          showTime={showTime}
          style={{ width: "100%" }}
          {...props}
        />
      );

    case "switch":
      return <Switch size={size} disabled={readonly} {...props} />;

    case "input":
    default:
      return <Input size={size} placeholder={placeholder} disabled={readonly} {...props} />;
  }
}
