import Col from 'antd/es/col';
import Row from 'antd/es/row';
import React from 'react';

import { DeleteOutlined, EditOutlined, ProfileOutlined, SyncOutlined } from '@ant-design/icons';

import { Dividers } from '../../../../src';
import { RowsGroups } from '../../../../src/dividers';

const DividersSample = (params: any) => {
  const horizontalDividersSample = (rows: RowsGroups) => <Dividers type="horizontal" rows={rows} />;

  const verticalDividersSample = (rows: RowsGroups) => <Dividers type="vertical" rows={rows} />;
  return (
    <>
      <Row gutter={8}>
        <Col span={6}>
          <h1>Dividers</h1>
          <h3>row as React.ReactNode</h3>
          <Dividers rows={[<a key="1">Action 1</a>, <a key="2">Action 2</a>]} type="vertical" />
          <h3>vertical row as Row</h3>
          {horizontalDividersSample([
            [
              { label: '编辑', icon: <EditOutlined /> },
              { label: '删除', icon: <DeleteOutlined /> },
            ],
          ])}
          <h3>horizontal row as Row</h3>
          {verticalDividersSample([
            [
              { label: '编辑', icon: <EditOutlined /> },
              { label: '删除', icon: <DeleteOutlined /> },
            ],
          ])}
        </Col>
        <Col span={6}>
          <h1>Dividers For Multi Rows</h1>
          <h3>row as React.ReactNode</h3>
          <Dividers
            outerDividerVisible={false}
            rows={[
              [<a key="1-1">Action 1</a>, <a key="1-2">Action 2</a>],
              [<a key="2-1">Action 1</a>, <a key="2-2">Action 2</a>],
            ]}
            type="vertical"
          />
          <h3>vertical row as Row</h3>
          {horizontalDividersSample([
            [
              { label: '编辑', icon: <EditOutlined /> },
              { label: '删除', icon: <DeleteOutlined /> },
            ],
            [
              { label: '同步', icon: <SyncOutlined /> },
              { label: '查看详情', icon: <ProfileOutlined /> },
            ],
          ])}
          <h3>horizontal row as Row</h3>
          {verticalDividersSample([
            [
              { label: '编辑', icon: <EditOutlined /> },
              { label: '删除', icon: <DeleteOutlined /> },
            ],
            [
              { label: '同步', icon: <SyncOutlined /> },
              { label: '查看', icon: <ProfileOutlined /> },
            ],
          ])}
        </Col>
      </Row>
    </>
  );
};

export default DividersSample;
