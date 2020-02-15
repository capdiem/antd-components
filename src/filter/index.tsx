import "antd/lib/button/style";
import "antd/lib/cascader/style";
import "antd/lib/col/style";
import "antd/lib/date-picker/style";
import "antd/lib/form/style";
import "antd/lib/input/style";
import "antd/lib/input-number/style";
import "antd/lib/popconfirm/style";
import "antd/lib/row/style";
import "antd/lib/select/style";
import "antd/lib/upload/style";

import Button from "antd/lib/button";
import Cascader, { CascaderProps } from "antd/lib/cascader";
import Col from "antd/lib/col";
import DatePicker from "antd/lib/date-picker";
import Form from "antd/lib/form";
import Input, { InputProps, TextAreaProps } from "antd/lib/input";
import InputNumber, { InputNumberProps } from "antd/lib/input-number";
import Popconfirm, { PopconfirmProps } from "antd/lib/popconfirm";
import Row from "antd/lib/row";
import Select from "antd/lib/select";
import Upload from "antd/lib/upload";
import React, { useEffect } from "react";

import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";

import { SelectProps } from "../form-modal/types";
import { computeCell } from "../utils";
import { Btn, Btns, BtnsGroups, FilterComponentProps, FilterItem } from "./types";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Group: ButtonGroup } = Button;

type Props = FilterComponentProps;

const Filter: React.FC<Props> = ({
  style,
  query,
  defaultValues,
  size = "middle",
  items = [],
  btns = [],
  reloadBtnRef,
  onSearch,
  onReload,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (query) {
      if (defaultValues) {
        const obj = {};
        Object.keys(defaultValues).forEach((prop) => (obj[prop] = null));
        form.setFieldsValue({ ...query, ...obj });
      } else {
        form.setFieldsValue(query);
      }
    }
  });

  function handleOnSearch() {
    if (typeof onSearch === "function") {
      form.validateFields().then((values) => onSearch(values));
    }
  }

  /**
   * 重置筛选框（可使用onRefReloadBtn触发）
   * @param query reloadBtnRef's param
   * @example const reloadBtnRef = React.useRef<ReloadBtnRef>()
   * reloadBtnRef.handleClick(false)
   */
  function handleOnReload(query: any = true) {
    form.resetFields();

    if (query && typeof onReload === "function") {
      onReload();
    }
  }

  function renderFormItem(item: FilterItem<any>, lg: number) {
    const { type, field, placeholder, label, props, ...itemProps } = item;

    let element: React.ReactElement;

    switch (type) {
      case "textarea":
        element = (
          <Input.TextArea
            placeholder={placeholder || label}
            style={{ marginBottom: 0 }}
            {...(props as TextAreaProps)}
          />
        );
        break;
      case "inputNumber":
        element = (
          <InputNumber
            placeholder={placeholder || label}
            style={{ width: "100%" }}
            size={size}
            {...(props as InputNumberProps)}
          />
        );
        break;
      case "select": {
        const { options, ...etc } = props as SelectProps;

        element = (
          <Select placeholder={placeholder || label} style={{ width: "100%" }} size={size} {...etc}>
            {options.map((u) => (
              <Option key={u.value} value={u.value}>
                {u.label}
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
            placeholder={placeholder || label}
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
            {options.map(({ label: lb, value }) => (
              <Option key={value} value={value}>
                {lb}
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
            size={size}
            showSearch
            allowClear
            showArrow={false}
            filterOption={false}
            defaultActiveFirstOption={false}
            notFoundContent={null}
            placeholder={placeholder || label}
            style={{ width: "100%" }}
            {...etc}
          >
            {options.map((u) => (
              <Option key={u.value} value={u.value}>
                {u.label}
              </Option>
            ))}
          </Select>
        );
        break;
      }
      case "cascader":
        element = (
          <Cascader
            size={size}
            changeOnSelect
            placeholder={placeholder || label}
            style={{ width: "100%" }}
            {...(props as CascaderProps)}
          />
        );
        break;
      case "dateRangePicker":
        element = (
          <RangePicker
            size={size}
            placeholder={[`${placeholder}开始时间`, `${placeholder}结束时间`]}
            style={{ width: "100%" }}
            {...(props as any)}
          />
        );
        break;
      case "datePicker":
        element = (
          <DatePicker
            size={size}
            placeholder={placeholder}
            style={{ width: "100%" }}
            {...(props as any)}
          />
        );
        break;
      case "input":
      default:
        element = (
          <Input size={size} placeholder={placeholder || label} {...(props as InputProps)} />
        );
        break;
    }

    return (
      <Col lg={lg} md={24} sm={24} xs={24} key={field as string} style={{ marginBottom: 4 }}>
        <Form.Item name={field as string} noStyle {...itemProps}>
          {element}
        </Form.Item>
      </Col>
    );
  }

  const cols: React.ReactNode[] = [];
  items.forEach((items) => {
    const lg = computeCell(items.length);
    cols.push(
      ...items
        .filter((u) => u.visible === undefined || u.visible)
        .map((item) => renderFormItem(item, lg))
    );
  });

  function renderBtns(items: Btn<any>[]) {
    return items
      .filter((u) => u.visible === undefined || u.visible === true)
      .map((item, index) => {
        const {
          mode = "default",
          icon,
          text,
          type,
          onClick,
          loading,
          disabled,
          props,
          ...btnProps
        } = item;
        if (mode === "upload") {
          const style: React.CSSProperties = {};
          if (index === 0 && items.length === 1) {
            style.borderRadius = 2;
          } else if (index === 0 && items.length > 1) {
            style.borderRadius = "2px 0 0 2px";
          } else if (index === items.length - 1) {
            style.borderRadius = "0 2px 2px 0";
          }

          return (
            <Upload
              disabled={disabled}
              key={index}
              showUploadList={false}
              customRequest={({ file, onSuccess, onError }) => {
                if (!file || !onClick) return false;
                const promise = onClick(file);
                promise &&
                  promise
                    .then((data) => {
                      onSuccess(data, file);
                    })
                    .catch(onError);
              }}
              {...props}
            >
              <Button
                size={size}
                type="primary"
                loading={loading}
                icon={icon}
                disabled={disabled}
                style={style}
                {...btnProps}
              >
                {text}
              </Button>
            </Upload>
          );
        }

        if (mode === "confirm") {
          return (
            <Popconfirm
              key={index}
              onConfirm={() =>
                typeof onClick === "function" && onClick(form.getFieldsValue() as any)
              }
              disabled={disabled}
              {...(props as PopconfirmProps)}
            >
              <Button
                size={size}
                type={type || "primary"}
                loading={loading}
                icon={icon}
                disabled={disabled}
                {...btnProps}
              >
                {text}
              </Button>
            </Popconfirm>
          );
        }
        return (
          <Button
            type={type || "primary"}
            size={size}
            icon={icon}
            loading={loading}
            disabled={disabled}
            onClick={() => typeof onClick === "function" && onClick(form.getFieldsValue() as any)}
            key={index}
            {...btnProps}
          >
            {text}
          </Button>
        );
      });
  }

  const btnElementGroups = [];
  if (btns && btns.length > 0) {
    if (btns[0] instanceof Array) {
      (btns as BtnsGroups).forEach((items) => btnElementGroups.push(renderBtns(items)));
    } else {
      btnElementGroups.push(renderBtns(btns as Btns));
    }
  }

  const rootStyle: React.CSSProperties = style || {
    marginBottom: 10,
  };

  const formItemsGroupStyle: React.CSSProperties =
    rootStyle.display && rootStyle.display === "flex"
      ? {
          marginRight: "4px",
        }
      : {};

  return (
    <div style={rootStyle}>
      {!!cols.length && (
        <Form form={form} initialValues={defaultValues}>
          <Row gutter={8} style={formItemsGroupStyle}>
            {cols}
          </Row>
        </Form>
      )}
      <Row justify="end" gutter={4}>
        {btnElementGroups.map((btnElements, index) => (
          <Col key={index}>
            <ButtonGroup style={{ display: "flex" }} size={size}>
              {btnElements}
            </ButtonGroup>
          </Col>
        ))}
        {cols.length > 0 && (
          <Col>
            <ButtonGroup size={size}>
              <Button
                size={size}
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleOnSearch}
              />
              <Button
                size={size}
                type="primary"
                icon={<ReloadOutlined />}
                onClick={(e) => handleOnReload(e)}
                ref={reloadBtnRef as any}
              />
            </ButtonGroup>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Filter;
