/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/heading-has-content */
import Button from 'antd/es/button';
import Col from 'antd/es/col';
import Divider from 'antd/es/divider';
import Row from 'antd/es/row';
import { FormInstance } from 'antd/lib/form';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

import { Dividers, Filter, FormModal, Table, TableModal } from '../../../src';
import { ReloadBtnRef } from '../../../src/filter/types';
import { TableColumnProps } from '../../../src/table/types';
import styles from './index.css';

export default function() {
  const formRef = useRef<FormInstance>(null);
  const [columns, setColumns] = useState<TableColumnProps<any>[]>([]);
  const [formModalVisible, setFormModalVisible] = useState<boolean>(false);
  const [formModalVisibleWithoutData, setFormModalVisibleWithoutData] = useState<boolean>(false);
  const [tableModalVisible, setTableModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setColumns([
      { dataIndex: 'name', title: '名称' },
      { dataIndex: 'age', title: '年龄' },
      { dataIndex: 'gender', title: '性别' },
    ]);
  }, []);

  const reloadBtnRef = useRef<ReloadBtnRef>(null);

  return (
    <div className={styles.normal}>
      <Row gutter={9}>
        <Col span={6}>
          <Button type="primary" onClick={() => setFormModalVisible(true)}>
            Form Modal
          </Button>
        </Col>
        <Col span={12}>
          <Filter
            mode="simple"
            onModeChange={mode => console.log('mode', mode)}
            query={{
              test: '123456789',
              startDate: moment('2020-01-10 13:12:22'),
            }}
            defaultValues={{
              test2: '2222222',
            }}
            items={[
              [
                { field: 'test', placeholder: 'test' },
                { field: 'test2', placeholder: 'test2', simple: true },
                {
                  type: 'select',
                  field: 'test4',
                  placeholder: 'test4',
                  props: {
                    options: ['1', '2', '3'].map(u => ({ label: u, value: u })),
                  },
                },
              ],
              [{ field: 'test3', placeholder: 'test3' }],
              [{ field: 'startDate', placeholder: '开始时间', type: 'datePicker', simple: true }],
              [{ field: 'rangeDate', placeholder: '测试', type: 'dateRangePicker' }],
            ]}
            reloadBtnRef={reloadBtnRef}
            onSearch={values => console.log('values', values)}
            onReload={() => console.log('reload')}
            btns={[
              {
                mode: 'upload',
                icon: <UploadOutlined />,
                props: {
                  accept: '.xlsx, .xls',
                  showUploadList: false,
                },
                onClick(file: File) {
                  console.log('file', file);
                  return Promise.resolve('test');
                },
              },
              {
                mode: 'confirm',
                text: 'confirm',
                props: {
                  title: 'title',
                  okText: '确认不？',
                },
                onClick: (values: any) => console.log('values', values),
              },
              {
                icon: <PlusOutlined />,
                onClick: () => setFormModalVisibleWithoutData(true),
              },
            ]}
          />
          <Button
            type="dashed"
            style={{ width: '100%' }}
            onClick={() => {
              reloadBtnRef.current?.handleClick(false);
            }}
          >
            reloadBtnRef
          </Button>
        </Col>
        <Col span={6}>
          <Button type="primary" onClick={() => setTableModalVisible(true)}>
            Show Table Modal
          </Button>
          <TableModal
            modal={{
              visible: tableModalVisible,
              onCancel: () => setTableModalVisible(false),
            }}
            table={{
              columns: columns,
              dataSource: [{ name: 'cyx', age: 25, gender: 'man' }],
              bordered: true,
              rowKey: 'name',
            }}
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={8}>
        <Col span={4}>
          <h1>Dividers</h1>
          <Dividers rows={[<a key="1">Action 1</a>, <a key="2">Action 2</a>]} type="vertical" />
        </Col>
        <Col span={10}>
          <div>
            <h1 style={{ display: 'inline-block', marginRight: 10 }}>Table</h1>
            <Button
              type="primary"
              onClick={() => {
                const _ = [...columns];
                _[1].visible = !_[1].visible;
                setColumns(_);
              }}
            >
              Toggle To Hide/Show Age Column
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={[{ name: 'cyx', age: 25, gender: 'man' }]}
            bordered={true}
            rowKey="name"
          />
        </Col>
        <Col span={10}>
          <div>
            <h1>Table with fullscreen</h1>
          </div>
          <Table
            fullscreen={true}
            columns={columns}
            dataSource={[{ name: 'cyx', age: 25, gender: 'man' }]}
            bordered={true}
            rowKey="name"
          />
        </Col>
      </Row>
      <FormModal
        title="Form Modal"
        tips={
          <Button
            type={'dashed'}
            style={{ width: '100%' }}
            onClick={() => console.log(formRef.current?.getFieldsValue())}
          >
            FormModal Ref getValuesValue
          </Button>
        }
        ref={formRef}
        visible={formModalVisible || formModalVisibleWithoutData}
        layout="vertical"
        labelCol={4}
        wrapperCol={20}
        formItemCol={8}
        defaultValues={
          formModalVisibleWithoutData
            ? undefined
            : {
                name: 'cyx',
                multipleImageId: [
                  {
                    id: -1000,
                    uid: -1000,
                    name: '主图.png',
                    status: 'done',
                    url:
                      'http://qstbgmall.oss-cn-hangzhou.aliyuncs.com/gms/mainImage/微信图片_20191115111055_191115163314839.png',
                  },
                  {
                    id: -1001,
                    uid: -1001,
                    name: '主图.png',
                    status: 'done',
                    url:
                      'http://qstbgmall.oss-cn-hangzhou.aliyuncs.com/gms/mainImage/微信图片_20191115111055_191115163314839.png',
                  },
                ],
                singleImageId: {
                  id: -1001,
                  uid: -1001,
                  name: '主图.png',
                  status: 'done',
                  url:
                    'http://qstbgmall.oss-cn-hangzhou.aliyuncs.com/gms/mainImage/微信图片_20191115111055_191115163314839.png',
                },
              }
        }
        formItemsGroups={[
          {
            key: 'base',
            title: '基础信息',
            formItems: [
              {
                field: 'name',
                label: '姓名姓名姓名姓名',
                col: { span: 12 },
              },
              {
                type: 'select',
                field: 'gender',
                label: '性别',
                props: {
                  options: [
                    { label: 'man', value: 'man' },
                    { label: 'woman', value: 'woman' },
                  ],
                },
                col: { lg: 12 },
              },
            ],
          },
          {
            key: 'image',
            title: '多图片',
            formItems: [
              {
                type: 'upload-images',
                field: 'multipleImageId',
                label: '图片',
                col: { lg: 24 },
                props: {
                  onUpload: file =>
                    Promise.resolve({
                      id: '12345',
                      url:
                        'http://qstbgmall.oss-cn-hangzhou.aliyuncs.com/gms/mainImage/微信图片_20191115111055_191115163314839.png',
                    }),
                },
              },
              {
                type: 'upload-image',
                field: 'singleImageId',
                label: '图片',
                col: { lg: 24 },
                props: {
                  onUpload: () =>
                    Promise.resolve({
                      id: '12345',
                      url:
                        'http://qstbgmall.oss-cn-hangzhou.aliyuncs.com/gms/mainImage/微信图片_20191115111055_191115163314839.png',
                    }),
                },
              },
              {
                type: 'treeSelect',
                field: 'tree',
                label: '树选择',
                props: {
                  treeData: [
                    {
                      title: '1',
                      key: '1',
                      children: [
                        { title: '1-1', key: '1-1' },
                        { title: '1-2', key: '1-2', children: [] },
                      ],
                    },
                    {
                      title: '2',
                      key: '2',
                      children: [
                        { title: '2-1', key: '2-1' },
                        { title: '2-2', key: '2-2', children: [] },
                      ],
                    },
                  ],
                },
              },
            ],
          },
          {
            title: 'Extra',
            formItems: [
              {
                type: 'textarea',
                label: '额外信息',
                field: 'extra',
              },
            ],
          },
        ]}
        onOk={(values: any) => console.log('values', values)}
        onCancel={() => {
          setFormModalVisible(false);
          setFormModalVisibleWithoutData(false);
        }}
      />
    </div>
  );
}
