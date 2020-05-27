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
import React, { useEffect, useState } from "react";

import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";

import { SelectProps } from "../form-modal/types";
import { computeCell } from "../utils";
import { Btn, Btns, BtnsGroups, FilterComponentProps, FilterItem, FilterMode } from "./types";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Group: ButtonGroup } = Button;

const Filter: React.FC<FilterComponentProps<any>> = ({
  style,
  mode,
  onModeChange,
  query,
  defaultValues,
  size = "middle",
  items = [],
  btns = [],
  searchText,
  reloadText,
  reloadBtnRef,
  onSearch,
  onReload,
}) => {
  const [form] = Form.useForm();

  /** toggle between Simple and Advanced mode */
  const [filterMode, setFilterMode] = useState<FilterMode>(mode ?? "advanced");

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
  }, []);

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

  function renderFormItem(item: FilterItem<any>, mode: FilterMode, lg: number) {
    const { type, field, placeholder, label, props, ...itemProps } = item;

    let element: React.ReactElement;
    const style: React.CSSProperties =
      mode === undefined || mode === "advanced" ? { width: "100%" } : {};

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
            style={style}
            size={size}
            {...(props as InputNumberProps)}
          />
        );
        break;
      case "select": {
        const { options, ...etc } = props as SelectProps;

        element = (
          <Select placeholder={placeholder || label} style={style} size={size} {...etc}>
            {options.map(({ label: content, ...opts }) => (
              <Option key={opts.value} {...opts}>
                {content}
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
            style={style}
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
            {options.map(({ label: content, ...opts }) => (
              <Option key={opts.value} {...opts}>
                {content}
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
            style={style}
            {...etc}
          >
            {options.map(({ label: content, ...opts }) => (
              <Option key={opts.value} {...opts}>
                {content}
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
            style={style}
            {...(props as CascaderProps)}
          />
        );
        break;
      case "dateRangePicker":
        element = (
          <RangePicker
            size={size}
            placeholder={[`${placeholder}开始时间`, `${placeholder}结束时间`]}
            style={style}
            {...(props as any)}
          />
        );
        break;
      case "datePicker":
        element = (
          <DatePicker size={size} placeholder={placeholder} style={style} {...(props as any)} />
        );
        break;
      case "input":
      default:
        element = (
          <Input size={size} placeholder={placeholder || label} {...(props as InputProps)} />
        );
        break;
    }

    return mode === undefined || mode === "advanced" ? (
      <Col lg={lg} md={24} sm={24} xs={24} key={field as string} style={{ marginBottom: 4 }}>
        <Form.Item name={field as string} noStyle {...itemProps}>
          {element}
        </Form.Item>
      </Col>
    ) : (
      <Col key={field as string} style={{ marginBottom: 4 }}>
        <Form.Item name={field as string} noStyle {...itemProps}>
          {element}
        </Form.Item>
      </Col>
    );
  }

  const cols: React.ReactNode[] = [];
  (filterMode === undefined || filterMode === "advanced" ? items : [items[0]]).forEach((items) => {
    const lg = computeCell(items.length);
    cols.push(
      ...items
        .filter((u) => u.visible === undefined || u.visible)
        .map((item) => renderFormItem(item, filterMode, lg))
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
    marginBottom: 6,
  };

  const formItemsGroupStyle: React.CSSProperties =
    rootStyle.display && rootStyle.display === "flex"
      ? {
          marginRight: "4px",
        }
      : {};

  return (
    <div style={rootStyle}>
      {!!cols.length && (filterMode === undefined || filterMode === "advanced") && (
        <Form form={form} initialValues={defaultValues}>
          <Row gutter={4} style={formItemsGroupStyle}>
            {cols}
          </Row>
        </Form>
      )}
      <Row justify="end" gutter={8}>
        {!!cols.length && filterMode === "simple" && (
          <Col>
            <Form form={form} initialValues={defaultValues}>
              <Row justify="end" gutter={4}>
                {cols}
              </Row>
            </Form>
          </Col>
        )}
        <Col>
          <Row gutter={4}>
            {btnElementGroups.map((btnElements, index) => (
              <Col style={{ marginBottom: 4 }} key={index}>
                <ButtonGroup size={size} style={{ display: "flex" }}>
                  {btnElements}
                </ButtonGroup>
              </Col>
            ))}
            {cols.length > 0 && (
              <>
                <Col style={{ marginBottom: 4 }}>
                  <ButtonGroup size={size}>
                    <Button
                      size={size}
                      type="primary"
                      icon={<SearchOutlined />}
                      onClick={handleOnSearch}
                    >
                      {searchText}
                    </Button>
                    <Button
                      size={size}
                      type="primary"
                      icon={<ReloadOutlined />}
                      onClick={(e) => handleOnReload(e)}
                      ref={reloadBtnRef as any}
                    >
                      {reloadText}
                    </Button>
                  </ButtonGroup>
                </Col>
                {mode !== undefined && (
                  <Col style={{ marginBottom: 4 }}>
                    <Button
                      size={size}
                      style={{ padding: 4 }}
                      type="link"
                      onClick={() => {
                        const toggledMode = filterMode === "advanced" ? "simple" : "advanced";

                        setFilterMode(toggledMode);
                        onModeChange && onModeChange(toggledMode);
                      }}
                    >
                      {filterMode === "advanced" ? "简单搜索" : "高级搜索"}
                    </Button>
                  </Col>
                )}
              </>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
