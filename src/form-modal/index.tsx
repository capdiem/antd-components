import { Col, Form, Modal, Row } from "antd";
import React from "react";

import { renderItem } from "./helper";
import { FormItem, FormModalComponentProps } from "./types";

const { Item: FormItem } = Form;

const FormModal: React.FC<FormModalComponentProps> = ({
  form: { getFieldDecorator, validateFields, resetFields },
  title,
  visible,
  tips,
  formItems = [],
  formItemCol = {},
  labelCol,
  wrapperCol,
  maskClosable = false,
  hasFeedback = true,
  formItemStyle,
  size = "default",
  confirmLoading = false,
  initialData,
  onOk,
  onCancel,
  ...modalProps
}) => {
  const formProps: any = {};
  if (size === "small") {
    formProps.layout = "vertical";
  } else {
    formProps.layout = "horizontal";
    formProps.labelCol = typeof labelCol === "number" ? { span: labelCol } : labelCol;
    formProps.wrapperCol = typeof wrapperCol === "number" ? { span: wrapperCol } : wrapperCol;
  }

  const formItemProps = {
    hasFeedback,
    style: formItemStyle || { marginBottom: 0 },
  };

  function handleCancel() {
    resetFields();
    onCancel();
  }

  function handleOk() {
    validateFields((err, values) => {
      if (err) return;

      // return Promise.Resolve meanings request succeeded
      const promise = onOk(values);
      if (promise) {
        promise.then(() => {
          resetFields();
        });
      }
    });
  }

  function renderFormItem(item: FormItem) {
    const {
      initialValue = undefined,
      type,
      field,
      label,
      required = false,
      rules = [],
      valuePropName = "value",
      ...props
    } = item;

    const colProps = {
      key: field,
      lg: 24,
      md: 24,
      sm: 24,
      xs: 24,
      ...formItemCol,
    };

    const requiredRule = {
      required,
      message: type === "select" || type === "dynamicSelect" ? `请选择${label}` : `请输入${label}`,
    };

    let value = initialValue;
    if (initialData && initialValue === undefined) {
      value = initialData[field];
    }

    return (
      <Col {...colProps}>
        <FormItem label={label} {...formItemProps} key={field}>
          {getFieldDecorator(field, {
            initialValue: value,
            rules: [requiredRule, ...rules],
            valuePropName,
          })(renderItem({ type, field, label, ...props }))}
        </FormItem>
      </Col>
    );
  }

  return (
    <Modal
      title={title}
      visible={visible}
      confirmLoading={confirmLoading}
      okButtonProps={{ size }}
      cancelButtonProps={{ size }}
      maskClosable={maskClosable}
      {...modalProps}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      {tips && <div style={{ marginBottom: 8 }}>{tips}</div>}
      <Form {...formProps}>
        <Row gutter={8}>
          {formItems
            .filter((u) => u.visible === undefined || u.visible === true)
            .map((item) => renderFormItem(item))}
        </Row>
      </Form>
    </Modal>
  );
};

export default Form.create<FormModalComponentProps>()(FormModal);
