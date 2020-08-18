import "antd/lib/modal/style";
import "antd/lib/row/style";
import "antd/lib/col/style";
import "antd/lib/form/style";

import Col, { ColProps } from "antd/lib/col";
import ConfigProvider from "antd/lib/config-provider";
import Divider from "antd/lib/divider";
import Form from "antd/lib/form";
import { FormInstance, FormProps } from "antd/lib/form/Form";
import Modal from "antd/lib/modal";
import Row from "antd/lib/row";
import Upload, { RcFile } from "antd/lib/upload";
import React, { forwardRef, useEffect, useState } from "react";

import { UploadOutlined } from "@ant-design/icons";

import { getConfigProviderProps } from "../";
import * as helper from "./helper";
import { FormItem, FormModalComponentProps, UploadProps } from "./types";

type Props = FormModalComponentProps;

const FormModal = forwardRef<FormInstance, Props>((props, ref) => {
  const {
    tips,
    formItems,
    formItemsGroups,
    hideRequiredMark = false,
    colon = true,
    name,
    layout,
    labelAlign = "right",
    labelCol,
    wrapperCol,
    formItemCol,
    hasFeedback = false,
    formItemStyle = { marginBottom: 0 },
    initialValues,
    defaultValues,
    title,
    visible,
    size = "middle",
    confirmLoading = false,
    maskClosable = false,
    okButtonProps = {},
    cancelButtonProps = {},
    onOk,
    onCancel,
    ...modalProps
  } = props;

  const [fileList, setFileList] = useState<any>({});
  const [form] = Form.useForm();

  function initFileList(items: FormItem[], values: any) {
    const obj: object = {};

    items
      .filter((u) => u.type === "upload-image")
      .forEach((u) => {
        if (values && values[u.field]) {
          obj[u.field] = [values[u.field]];
          values[u.field] = [values[u.field]];
        } else {
          obj[u.field] = [];
        }
      });

    items
      .filter((u) => u.type === "upload-images")
      .forEach((u) => {
        if (values && values[u.field]) obj[u.field] = values[u.field];
        else obj[u.field] = [];
      });

    return obj;
  }

  useEffect(() => {
    let _fileList: object = {};
    if (formItemsGroups) {
      formItemsGroups.forEach(
        ({ formItems }) =>
          (_fileList = { ..._fileList, ...initFileList(formItems, initialValues || defaultValues) })
      );
    } else {
      _fileList = initFileList(formItems, initialValues || defaultValues);
    }
    setFileList(_fileList);

    // work with `form.resetFields()` in handleCancel()
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else if (defaultValues) {
      form.setFieldsValue(defaultValues);
    } else {
      form.resetFields();
    }
  }, [visible]);

  const formProps: FormProps = {
    /** do not use initialValues! */
    // initialValues,
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
    formProps.layout = layout ? layout : size === "small" ? "vertical" : "horizontal";
    if (labelCol) formProps.labelCol = typeof labelCol === "number" ? { span: labelCol } : labelCol;
    if (wrapperCol)
      formProps.wrapperCol = typeof wrapperCol === "number" ? { span: wrapperCol } : wrapperCol;
  }

  function handleCancel() {
    onCancel();

    // only clear fields value when initialValues === undefined
    form.resetFields();
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
    const { type, field, label, readonly, required = false, rules = [], col, props } = item;

    let _colProps: ColProps = col || {};
    if (!col && formItemCol) {
      if (typeof formItemCol === "number") {
        _colProps.span = formItemCol;
      } else {
        _colProps = formItemCol;
      }
    }

    const colProps: ColProps = {
      lg: _colProps?.span ?? 24,
      md: _colProps?.span ?? 24,
      sm: _colProps?.span ?? 24,
      xs: _colProps?.span ?? 24,
      ..._colProps,
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
              disabled={readonly}
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
          helper.renderFormItem(item, size, formItemStyle)
        )}
      </Col>
    );
  }
  return (
    <ConfigProvider {...getConfigProviderProps()}>
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
        <Form ref={ref} {...formProps}>
          {formItemsGroups ? (
            formItemsGroups.map(({ key, formItems, title, ...props }, index) => (
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
    </ConfigProvider>
  );
});

export default FormModal;
