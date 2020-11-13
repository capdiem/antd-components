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
          Open Upload-Images FormModal
        </Button>

        <Button
          type="primary"
          onClick={() =>
            setData({
              visible: true,
              depend: {
                name: 'James',
                avatar:
                  'http://qstbgmall.oss-cn-hangzhou.aliyuncs.com/gms/mainImage/微信图片_20191115111055_191115163314839.png',
                images: [
                  'http://qstbgmall.oss-cn-hangzhou.aliyuncs.com/gms/mainImage/微信图片_20191115111055_191115163314839.png',
                ],
              },
            })
          }
        >
          Open with InitialValues
        </Button>
      </Space>

      <FormModal
        visible={data.visible}
        initialValues={
          data.depend
            ? {
                name: data.depend.name,
                avatar: {
                  uid: 'custom-uid',
                  url: data.depend.avatar,
                },
                images: data.depend.images.map((u: any) => ({
                  uid: u,
                  url: u,
                })),
              }
            : undefined
        }
        title="Basic"
        labelCol={4}
        formItems={[
          {
            label: '姓名',
            field: 'name',
            placeholder: 'Please enter your name.',
            required: true,
          },
          {
            label: '头像',
            field: 'avatar',
            type: 'upload-image',
            props: {
              onUpload(file) {
                return Promise.resolve({
                  uid: file.uid,
                  url: 'your avatar url',
                });
              },
            },
          },
          {
            label: '生活照',
            field: 'images',
            type: 'upload-images',
            props: {
              onUpload(file) {
                return Promise.resolve({
                  uid: file.uid,
                  url: 'your avatar url',
                });
              },
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
