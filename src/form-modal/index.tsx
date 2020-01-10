import "antd/lib/modal/style";
import "antd/lib/row/style";
import "antd/lib/col/style";
import "antd/lib/form/style";

import Col, { ColProps } from "antd/lib/col";
import Divider from "antd/lib/divider";
import Form from "antd/lib/form";
import { FormProps } from "antd/lib/form/Form";
import Modal from "antd/lib/modal";
import Row from "antd/lib/row";
import Upload, { RcFile } from "antd/lib/upload";
import React, { useEffect, useState } from "react";

import { UploadOutlined } from "@ant-design/icons";

import { renderFormItem as renderCommonFormItem } from "./helper";
import { FormItem, FormModalComponentProps, UploadProps } from "./types";

type Props = FormModalComponentProps;

const FormModal: React.FC<Props> = ({
  tips,
  formItems,
  formItemsGroup,
  hideRequiredMark = false,
  colon = true,
  name,
  layout,
  labelAlign = "right",
  labelCol,
  wrapperCol,
  hasFeedback = false,
  formItemStyle = { marginBottom: 0 },
  initialValues,
  title,
  visible,
  size = "default",
  confirmLoading = false,
  maskClosable = false,
  okButtonProps = {},
  cancelButtonProps = {},
  onOk,
  onCancel,
  ...modalProps
}) => {
  const [fileList, setFileList] = useState<any>({});
  const [form] = Form.useForm();

  function initFileList(items: FormItem[]) {
    const obj: object = {};

    items
      .filter((u) => u.type === "upload-image")
      .forEach((u) => {
        if (initialValues && initialValues[u.field]) {
          obj[u.field] = [initialValues[u.field]];
          initialValues[u.field] = [initialValues[u.field]];
        } else {
          obj[u.field] = [];
        }
      });

    items
      .filter((u) => u.type === "upload-images")
      .forEach((u) => {
        if (initialValues && initialValues[u.field]) obj[u.field] = initialValues[u.field];
        else obj[u.field] = [];
      });

    return obj;
  }

  useEffect(() => {
    let _fileList: object = {};
    if (formItemsGroup) {
      formItemsGroup.forEach(
        ({ formItems }) => (_fileList = { ..._fileList, ...initFileList(formItems) })
      );
    } else {
      _fileList = initFileList(formItems);
    }
    setFileList(_fileList);

    initialValues ? form.setFieldsValue(initialValues) : form.resetFields();
  }, [visible]);

  const formProps: FormProps = {
    form,
    hideRequiredMark,
    colon: colon,
    name,
    labelAlign,
  };

  /** `layout`为vertical时将`labelCol`和`wrapperCol`强制设置为24 */
  if (layout && layout === "vertical") {
    formProps.layout = layout;
    formProps.labelCol = undefined;
    formProps.wrapperCol = undefined;
  } else {
    formProps.layout = layout || size === "small" ? "vertical" : "horizontal";
    formProps.labelCol = typeof labelCol === "number" ? { span: labelCol } : labelCol;
    formProps.wrapperCol = typeof wrapperCol === "number" ? { span: wrapperCol } : wrapperCol;
  }

  function handleCancel() {
    onCancel();
  }

  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        const result = onOk({ ...values, ...fileList });
        if (result) {
          result.then(() => form.resetFields());
        }
      })
      // eslint-disable-next-line no-console
      .catch((errors) => console.log("errors", errors));
  }

  function renderFormItem(item: FormItem<any>) {
    const { type, field, label, required = false, rules = [], col, props } = item;

    const colProps: ColProps = {
      lg: 24,
      md: 24,
      sm: 24,
      xs: 24,
      ...col,
    };

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
      <Col {...colProps} key={field} style={{ marginBottom: 8 }}>
        {type === "upload-image" || type === "upload-images" ? (
          <Form.Item
            label={label}
            key={field}
            name={field}
            rules={[requiredRule, ...rules]}
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            hasFeedback={hasFeedback}
            style={{ ...formItemStyle, flexWrap: "unset" }}
          >
            <Upload
              accept="image/*"
              listType="picture-card"
              customRequest={({ file, onSuccess, onError }) => {
                if (!file || !(props as UploadProps).onUpload) return false;

                (props as UploadProps)
                  .onUpload(file)
                  .then((data) => {
                    setFileList((state: any) => ({
                      ...state,
                      [field]: [
                        ...state[field],
                        {
                          ...file,
                          id: data.id,
                          url: data.url,
                        },
                      ],
                    }));

                    onSuccess(data, file);
                  })
                  .catch(onError);
              }}
              onPreview={(props as UploadProps).onPreview}
              onRemove={(file) => {
                setFileList((state: any) => ({
                  ...state,
                  [field]: state[field].filter((u: RcFile) => u.uid !== file.uid),
                }));
              }}
            >
              {fileList[field] && type === "upload-image" && fileList[field].length > 0 ? null : (
                <div>
                  <UploadOutlined />
                  <span style={{ marginLeft: 2 }}>上传图片</span>
                </div>
              )}
            </Upload>
          </Form.Item>
        ) : (
          renderCommonFormItem(item, size, hasFeedback, formItemStyle, [requiredRule, ...rules])
        )}
      </Col>
    );
  }
  return (
    <Modal
      title={title}
      visible={visible}
      confirmLoading={confirmLoading}
      okButtonProps={{ size, ...okButtonProps }}
      cancelButtonProps={{ size, ...cancelButtonProps }}
      maskClosable={maskClosable}
      {...modalProps}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      {tips && <div style={{ marginBottom: 12 }}>{tips}</div>}
      <Form {...formProps}>
        {formItemsGroup ? (
          formItemsGroup.map(({ key, formItems, title, ...props }, index) => (
            <div key={key || index}>
              {title && (
                <Divider orientation="left" {...props}>
                  {title}
                </Divider>
              )}
              <Row gutter={8}>
                {formItems
                  .filter((u) => u.visible === undefined || u.visible === true)
                  .map((u) => renderFormItem(u))}
              </Row>
            </div>
          ))
        ) : (
          <Row gutter={8}>
            {(formItems || [])
              .filter((u) => u.visible === undefined || u.visible === true)
              .map((u) => renderFormItem(u))}
          </Row>
        )}
      </Form>
    </Modal>
  );
};

export default FormModal;
