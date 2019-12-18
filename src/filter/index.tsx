import "antd/es/button/style";
import "antd/es/cascader/style";
import "antd/es/col/style";
import "antd/es/date-picker/style";
import "antd/es/form/style";
import "antd/es/input/style";
import "antd/es/input-number/style";
import "antd/es/popconfirm/style";
import "antd/es/row/style";
import "antd/es/select/style";
import "antd/es/upload/style";

import Button from "antd/es/button";
import Cascader from "antd/es/cascader";
import Col from "antd/es/col";
import DatePicker from "antd/es/date-picker";
import Form from "antd/es/form";
import Input from "antd/es/input";
import InputNumber from "antd/es/input-number";
import Popconfirm from "antd/es/popconfirm";
import Row from "antd/es/row";
import Select from "antd/es/select";
import Upload from "antd/es/upload";
import { CascaderOptionType } from "antd/lib/cascader";
import { FormComponentProps } from "antd/lib/form";
import { UploadProps } from "antd/lib/upload";
import React from "react";

import { Btn, FilterComponentProps, FilterFormItem } from "./types";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Group: ButtonGroup } = Button;

function computeCell(count: number) {
  if (count <= 1) return 24;
  if (count === 2) return 12;
  if (count === 3) return 8;
  return 6;
}

type Props = FilterComponentProps & FormComponentProps;

const Filter: React.FC<Props> = ({
  form: { getFieldDecorator, getFieldsValue, resetFields },
  style,
  initialValues = {},
  size = "default",
  formItemsGroups = [],
  btns = [],
  btnGroups = [],
  onRefReloadBtn,
  onSearch,
  onReload,
}) => {
  function handleOnSearch() {
    typeof onSearch === "function" && onSearch(getFieldsValue());
  }

  function handleOnReload() {
    resetFields();
    typeof onReload === "function" && onReload();
  }

  function renderFormItem(item: FilterFormItem<any>, lg: number) {
    const { type, field, placeholder = "", label, options = [], ...props } = item;

    let element: React.ReactNode;
    const colProps = {
      key: field as string,
      style: {
        marginBottom: 5,
      },
    };

    switch (type) {
      case "textarea":
        element = <Input.TextArea placeholder={placeholder || label} {...props} />;
        break;
      case "inputNumber":
        element = (
          <InputNumber
            placeholder={placeholder || label}
            style={{ width: "100%" }}
            size={size}
            {...props}
          />
        );
        break;
      case "select":
        element = (
          <Select
            placeholder={placeholder || label}
            style={{ width: "100%" }}
            size={size}
            {...props}
          >
            {options.map((u) => (
              <Option key={u.value} value={u.value}>
                {u.label}
              </Option>
            ))}
          </Select>
        );
        break;
      case "searchableSelect":
        element = (
          <Select
            placeholder={placeholder || label}
            style={{ width: "100%" }}
            size={size}
            allowClear
            showSearch
            filterOption={(input, option) =>
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              option.props
                .children!.toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            {...props}
          >
            {options.map(({ label: lb, value }) => (
              <Option key={value} value={value}>
                {lb}
              </Option>
            ))}
          </Select>
        );
        break;
      case "dynamicSelect":
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
            {...props}
          >
            {options.map((u) => (
              <Option key={u.value} value={u.value}>
                {u.label}
              </Option>
            ))}
          </Select>
        );
        break;
      case "cascader":
        element = (
          <Cascader
            size={size}
            changeOnSelect
            options={options as CascaderOptionType[]}
            placeholder={placeholder || label}
            style={{ width: "100%" }}
            {...props}
          />
        );
        break;
      case "dateRangePicker":
        element = (
          <RangePicker
            size={size}
            showTime
            placeholder={[`${placeholder}开始时间`, `${placeholder}结束时间`]}
            format={
              props.showTime !== undefined && !props.showTime ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss"
            }
            style={{ width: "100%" }}
            {...props}
          />
        );
        break;
      case "datePicker":
        element = (
          <DatePicker
            size={size}
            showTime
            placeholder={placeholder}
            format={
              props.showTime !== undefined && !props.showTime ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss"
            }
            style={{ width: "100%" }}
            {...props}
          />
        );
        break;
      case "input":
      default:
        element = <Input size={size} placeholder={placeholder || label} {...props} />;
        break;
    }

    let initialValue = initialValues[field];

    if (type === "cascader") {
      initialValue = typeof initialValue !== "object" ? [] : initialValue;
    }

    return (
      <Col lg={lg} md={24} sm={24} xs={24} {...colProps}>
        {getFieldDecorator(field as string, {
          initialValue,
        })(element)}
      </Col>
    );
  }

  const cols: React.ReactNode[] = [];
  formItemsGroups.forEach((items) => {
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
          onClick,
          confirmTitle,
          confirmText,
          loading,
          disabled,
          ...props
        } = item;
        if (mode === "upload") {
          const style: React.CSSProperties = {};
          if (index === 0 && items.length === 1) {
            style.borderRadius = 4;
          } else if (index === 0 && items.length > 1) {
            style.borderRadius = "4px 0 0 4px";
          } else if (index === items.length - 1) {
            style.borderRadius = "0 4px 4px 0";
          }

          return (
            <Upload disabled={disabled} key={index} {...(props as UploadProps)}>
              <Button
                size={size}
                type="primary"
                loading={loading}
                icon={icon}
                disabled={disabled}
                style={style}
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
              title={confirmTitle}
              okText={confirmText || "确定"}
              onConfirm={() => typeof onClick === "function" && onClick(getFieldsValue())}
              disabled={disabled}
            >
              <Button
                size={size}
                type="primary"
                loading={loading}
                icon={icon}
                disabled={disabled}
                {...props}
              >
                {text}
              </Button>
            </Popconfirm>
          );
        }
        return (
          <Button
            type="primary"
            size={size}
            icon={icon}
            loading={loading}
            disabled={disabled}
            onClick={() => typeof onClick === "function" && onClick(getFieldsValue())}
            key={index}
            {...props}
          >
            {text}
          </Button>
        );
      });
  }

  const btnElementGroups = [];
  if (btns && btns.length > 0) {
    btnElementGroups.push(renderBtns(btns));
  } else if (btnGroups && btnGroups.length > 0) {
    btnGroups.forEach((items) => {
      btnElementGroups.push(renderBtns(items));
    });
  }

  const rootStyle = style || {
    marginBottom: 10,
  };

  const formItemsGroupStyle =
    rootStyle.display && rootStyle.display === "flex"
      ? {
          marginRight: "4px",
        }
      : {};

  return (
    <div style={rootStyle}>
      {cols.length > 0 ? (
        <Row gutter={8} style={formItemsGroupStyle}>
          {cols}
        </Row>
      ) : (
        ""
      )}
      <Row type="flex" justify="end" gutter={4}>
        {btnElementGroups.map((btnElements, index) => (
          <Col key={index}>
            <ButtonGroup style={{ display: "flex" }} size={size}>
              {btnElements}
            </ButtonGroup>
          </Col>
        ))}
        {cols.length > 0 ? (
          <Col>
            <ButtonGroup size={size}>
              <Button size={size} type="primary" icon="search" onClick={handleOnSearch} />
              <Button
                size={size}
                type="primary"
                icon="reload"
                onClick={handleOnReload}
                ref={onRefReloadBtn}
              />
            </ButtonGroup>
          </Col>
        ) : (
          ""
        )}
      </Row>
    </div>
  );
};

export default Form.create<Props>()(Filter);
