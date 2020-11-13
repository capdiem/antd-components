import { Button, notification, Space } from 'antd';
import { FormModal } from 'components';
import React, { useState } from 'react';

declare type Data = {
  visible: boolean;
  depend?: any;
};

const Basic = () => {
  const [data, setData] = useState<Data>({
    visible: false,
  });

  return (
    <>
      <Space>
        <Button type="primary" onClick={() => setData({ visible: true })}>
          Open Basic FormModal
        </Button>

        <Button
          type="primary"
          onClick={() =>
            setData({
              visible: true,
              depend: {
                name: 'James',
                age: 33,
                gender: 'gentleman',
              },
            })
          }
        >
          Open with InitialValues
        </Button>
      </Space>

      <FormModal
        visible={data.visible}
        initialValues={data.depend}
        title="Basic"
        labelCol={4}
        formItems={[
          {
            label: '姓名',
            field: 'name',
            type: 'input',
            placeholder: 'Please enter your name.',
            required: true,
          },
          {
            label: '年龄',
            field: 'age',
            type: 'inputNumber',
            props: {
              min: 1,
              max: 100,
            },
          },
          {
            label: '性别',
            field: 'gender',
            type: 'radio',
            required: true,
            props: {
              options: [
                { label: '男', value: 'gentleman' },
                { label: '女', value: 'lady' },
              ],
            },
          },
        ]}
        onOk={values => {
          return Promise.resolve().then(() => {
            notification.info({
              message: 'Result',
              description: JSON.stringify(values),
            });
            setData({ visible: false });
          });
        }}
        onCancel={() => {
          setData({ visible: false });
        }}
      />
    </>
  );
};

export default Basic;
