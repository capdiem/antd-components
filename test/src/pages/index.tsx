/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/heading-has-content */
import Button from 'antd/es/button';
import Col from 'antd/es/col';
import Divider from 'antd/es/divider';
import Row from 'antd/es/row';
import React, { useEffect, useState } from 'react';

import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

import { Dividers, Filter, FormModal, Table, TableModal } from '../../../src';
import { TableColumnProps } from '../../../src/table/types';
// import { Dividers, Table } from '../../../lib';
import styles from './index.css';

export default function() {
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

  let reloadBtnRef: any;

  return (
    <div className={styles.normal}>
      <Row gutter={9}>
        <Col span={6}>
          <Button type="primary" onClick={() => setFormModalVisible(true)}>
            Form Modal
          </Button>
        </Col>
        <Col span={6}>
          <Filter
            formItemsGroups={[
              [
                { field: 'test', placeholder: 'test' },
                { field: 'test2', placeholder: 'test2' },
              ],
            ]}
            onRefReloadBtn={ref => (reloadBtnRef = ref)}
            onSearch={values => console.log('values', values)}
            onReload={() => console.log('reload')}
            btns={[
              {
                mode: 'upload',
                accept: '.xlsx, .xls',
                icon: <UploadOutlined />,
                showUploadList: false,
                onUpload(file) {
                  console.log('file', file);
                  return Promise.resolve('test');
                },
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
              reloadBtnRef.handleClick(false);
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
        visible={formModalVisible || formModalVisibleWithoutData}
        labelCol={4}
        wrapperCol={20}
        initialValues={
          formModalVisibleWithoutData
            ? undefined
            : {
                name: 'cyx',
                imageId: [
                  {
                    uid: -1000,
                    name: '主图.png',
                    status: 'done',
                    url:
                      'http://qstbgmall.oss-cn-hangzhou.aliyuncs.com/gms/mainImage/微信图片_20191115111055_191115163314839.png',
                  },
                  {
                    uid: -1001,
                    name: '主图.png',
                    status: 'done',
                    url:
                      'http://qstbgmall.oss-cn-hangzhou.aliyuncs.com/gms/mainImage/微信图片_20191115111055_191115163314839.png',
                  },
                ],
              }
        }
        formItems={[
          {
            field: 'name',
            label: '姓名',
          },
          {
            type: 'upload-images',
            field: 'imageId',
            label: '图片',
            onUpload: () =>
              Promise.resolve({
                uid: '12345',
                url:
                  'http://qstbgmall.oss-cn-hangzhou.aliyuncs.com/gms/mainImage/微信图片_20191115111055_191115163314839.png',
              }),
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
