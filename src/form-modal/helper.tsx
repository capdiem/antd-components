import "antd/lib/button/style";
import "antd/lib/cascader/style";
import "antd/lib/date-picker/style";
import "antd/lib/input/style";
import "antd/lib/input-number/style";
import "antd/lib/select/style";
import "antd/lib/upload/style";
import "antd/lib/switch/style";
import "antd/lib/form/style";

import Button from "antd/lib/button";
import Cascader, { CascaderProps } from "antd/lib/cascader";
import DatePicker from "antd/lib/date-picker";
import Form from "antd/lib/form";
import Input, { InputProps, TextAreaProps } from "antd/lib/input";
import InputNumber, { InputNumberProps } from "antd/lib/input-number";
import Select from "antd/lib/select";
import Switch, { SwitchProps } from "antd/lib/switch";
import Upload from "antd/lib/upload";
import React from "react";

import { UploadOutlined } from "@ant-design/icons";

import { DataEntryProps, DataEntryType, FormItem, SelectProps, Size, UploadProps } from "./types";

const { TextArea } = Input;
const { Option } = Select;

function renderDataEntry(
  props: DataEntryProps,
  type: DataEntryType = "input",
  size: Size = "default"
) {
  let element: React.ReactElement;

  switch (type) {
    case "textarea": {
      element = <TextArea style={{ marginBottom: 0 }} {...(props as TextAreaProps)} />;
      break;
    }
    case "inputNumber": {
      element = (
        <InputNumber size={size} style={{ width: "100%" }} {...(props as InputNumberProps)} />
      );
      break;
    }
    case "password": {
      element = (
        <Input size={size} type="password" style={{ width: "100%" }} {...(props as InputProps)} />
      );
      break;
    }
    case "select": {
      const { options, ...etc } = props as SelectProps;
      element = (
        <Select size={size} style={{ width: "100%" }} {...etc}>
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
      element = (
        <Select
          style={{ width: "100%" }}
          size={size}
          allowClear
          showSearch
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
      element = (
        <Select
          showSearch
          allowClear
          size={size}
          showArrow={false}
          filterOption={false}
          defaultActiveFirstOption={false}
          notFoundContent={null}
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
      element = (
        <Cascader
          size={size}
          changeOnSelect
          style={{ width: "100%" }}
          {...(props as CascaderProps)}
        />
      );
      break;
    }
    case "upload-excel": {
      const { onUpload, ...uploadProps } = props as UploadProps;
      element = (
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
      element = <DatePicker size={size} style={{ width: "100%" }} {...(props as any)} />;
      break;
    }
    case "switch": {
      element = <Switch size={size === "large" ? "default" : size} {...(props as SwitchProps)} />;
      break;
    }
    case "input":
    default: {
      element = <Input size={size} {...(props as InputProps)} />;
    }
  }

  return element;
}

/**
 * Render Form Item
 * @param item
 * @param size
 * @param style
 * @description labelCol and wrapperCol form Form props will not work
 */
function renderFormItem(item: FormItem, size: Size = "default", style?: React.CSSProperties) {
  const {
    field,
    label,
    required,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    col,
    rules = [],
    type,
    placeholder,
    readonly,
    props,
    ...etc
  } = item;

  /** 生成默认的 required error message */
  const requiredRule = { required, message: `请输入${label}` };
  if (type === "upload-image" || type === "upload-images" || type === "upload-excel") {
    requiredRule.message = `请上传${label}`;
  } else if (
    type === "select" ||
    type === "dynamicSelect" ||
    type === "searchableSelect" ||
    type === "cascader"
  ) {
    requiredRule.message = `请选择${label}`;
  }

  return (
    <Form.Item label={label} name={field} style={style} rules={[requiredRule, ...rules]} {...etc}>
      {renderDataEntry({ placeholder, disabled: readonly, ...props }, type, size)}
    </Form.Item>
  );
}

export { renderDataEntry, renderFormItem };
