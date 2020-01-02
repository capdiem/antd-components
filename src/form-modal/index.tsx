import "antd/es/modal/style";
import "antd/es/row/style";
import "antd/es/col/style";
import "antd/es/form/style";

import Col from "antd/es/col";
import Form from "antd/es/form";
import Modal from "antd/es/modal";
import Row from "antd/es/row";
import Upload, { RcFile } from "antd/es/upload";
import React, { useEffect, useState } from "react";

import { UploadOutlined } from "@ant-design/icons";

import { renderItem } from "./helper";
import { FormItem, FormModalComponentProps } from "./types";

type Props = FormModalComponentProps;

const FormModal: React.FC<Props> = ({
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
  initialValues,
  onOk,
  onCancel,
  ...modalProps
}) => {
  const [fileList, setFileList] = useState<any>({});
  const [form] = Form.useForm();

  useEffect(() => {
    const _fileList: any = {};

    formItems
      .filter((u) => u.type === "upload-image")
      .forEach((u) => {
        if (initialValues && initialValues[u.field]) {
          _fileList[u.field] = [initialValues[u.field]];
          initialValues[u.field] = [initialValues[u.field]];
        } else {
          _fileList[u.field] = [];
          initialValues[u.field] = [];
        }
      });

    formItems
      .filter((u) => u.type === "upload-images")
      .forEach((u) => {
        if (initialValues && initialValues[u.field]) _fileList[u.field] = initialValues[u.field];
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
    form.resetFields();
    onCancel();
  }

  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        onOk({ ...values, ...fileList })?.then(() => form.resetFields());
      })
      // eslint-disable-next-line no-console
      .catch((errors) => console.log("errors", errors));
  }

  function renderFormItem(item: FormItem) {
    const {
      type,
      field,
      label,
      required = false,
      rules = [],
      valuePropName = "value",
      onUpload,
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
    } else if (
      type === "select" ||
      type === "dynamicSelect" ||
      type === "searchableSelect" ||
      type === "cascader"
    ) {
      requiredRule.message = `请选择${label}`;
    }

    return (
      <Col {...colProps} style={{ marginBottom: 4 }}>
        {type === "upload-image" || type === "upload-images" ? (
          <Form.Item
            label={label}
            key={field}
            name={field}
            rules={[requiredRule, ...rules]}
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            {...formItemProps}
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              customRequest={({ file, onSuccess, onError }) => {
                if (!file || !onUpload) return false;

                onUpload(file)
                  .then((data) => {
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

                    onSuccess(data, file);
                  })
                  .catch(onError);
              }}
              onPreview={onPreview}
              onRemove={(file) => {
                setFileList((state: any) => {
                  state[field] = state[field].filter((u: RcFile) => u.uid !== file.uid);
                  return state;
                });
              }}
            >
              {fileList[field] && type === "upload-image" && fileList[field].length > 0 ? null : (
                <a>
                  <UploadOutlined />
                  <span style={{ marginLeft: 2 }}>上传图片</span>
                </a>
              )}
            </Upload>
          </Form.Item>
        ) : (
          <Form.Item
            label={label}
            key={field}
            name={field}
            rules={[requiredRule, ...rules]}
            valuePropName={valuePropName}
            {...formItemProps}
          >
            {renderItem({ type, field, label, ...props })}
          </Form.Item>
        )}
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
      <Form form={form} initialValues={initialValues} {...formProps}>
        <Row gutter={8}>
          {formItems
            .filter((u) => u.visible === undefined || u.visible === true)
            .map((item) => renderFormItem(item))}
        </Row>
      </Form>
    </Modal>
  );
};

export default FormModal;
