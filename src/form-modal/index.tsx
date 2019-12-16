import "antd/es/modal/style";
import "antd/es/row/style";
import "antd/es/col/style";
import "antd/es/form/style";

import Col from "antd/es/col";
import Form from "antd/es/form";
import Icon from "antd/es/icon";
import Modal from "antd/es/modal";
import Row from "antd/es/row";
import Upload, { RcFile } from "antd/es/upload";
import { FormComponentProps } from "antd/lib/form";
import React, { useEffect, useState } from "react";

import { renderItem } from "./helper";
import { FormItem, FormModalComponentProps } from "./types";

const { Item: FormItem } = Form;

type Props = FormModalComponentProps & FormComponentProps;

const FormModal: React.FC<Props> = ({
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
  const [fileList, setFileList] = useState<any>({});

  useEffect(() => {
    let _fileList: any = {};

    formItems
      .filter((u) => u.type === "upload-image")
      .forEach((u) => {
        if (u.initialValue) _fileList[u.field] = [u.initialValue];
        else if (initialData && initialData[u.field]) _fileList[u.field] = [initialData[u.field]];
        else _fileList[u.field] = [];
      });

    formItems
      .filter((u) => u.type === "upload-images")
      .forEach((u) => {
        if (u.initialValue) _fileList[u.field] = u.initialValue;
        else if (initialData && initialData[u.field]) _fileList[u.field] = initialData[u.field];
        else _fileList[u.field] = [];
      });

    setFileList(_fileList);
  }, [visible]);

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
      const promise = onOk({
        ...values,
        ...fileList,
      });
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
      beforeUpload,
      onPreview,
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
      message: `请输入${label}`,
    };

    if (type === "upload-image" || type === "upload-images" || type === "upload-excel") {
      requiredRule.message = `请上传${label}`;
    } else if (type === "select" || type === "dynamicSelect") {
      requiredRule.message = `请选择${label}`;
    }

    let value = initialValue;
    if (initialData && initialValue === undefined) {
      value = initialData[field];
    }

    return (
      <Col {...colProps}>
        <FormItem label={label} {...formItemProps} key={field}>
          {type === "upload-image" || type === "upload-images"
            ? getFieldDecorator(field, {
                initialValue:
                  fileList[field] && fileList[field].length > 0 ? fileList[field] : undefined,
                valuePropName: "fileList",
                getValueFromEvent: (e) => (Array.isArray(e) ? e : e && e.fileList),
                rules: [requiredRule, ...rules],
              })(
                <Upload
                  accept="image/*"
                  listType="picture-card"
                  beforeUpload={(file, fileList) =>
                    beforeUpload!(file, fileList).then((data: any) => {
                      setFileList((state: any) => {
                        state[field] = [
                          ...state[field],
                          {
                            ...file,
                            uid: data.uid,
                            url: data.url,
                          },
                        ];
                        return state;
                      });
                    })
                  }
                  onPreview={onPreview}
                  onRemove={(file) => {
                    setFileList((state: any) => {
                      state[field] = state[field].filter((u: RcFile) => u.uid !== file.uid);
                      return state;
                    });
                  }}
                >
                  {fileList[field] &&
                  type === "upload-image" &&
                  fileList[field].length > 0 ? null : (
                    <a>
                      <Icon type="upload" />
                      <span style={{ marginLeft: 2 }}>上传图片</span>
                    </a>
                  )}
                </Upload>
              )
            : getFieldDecorator(field, {
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

export default Form.create<Props>()(FormModal);
