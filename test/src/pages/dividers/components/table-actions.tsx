import { Button, Slider } from 'antd';
import { Dividers, Table } from 'components';
import React, { useState } from 'react';

import { DeleteOutlined, FormOutlined } from '@ant-design/icons';

import { TableComponentProps } from '../../../../../src/table/types';

const TableActions = () => {
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(100);

  const props: TableComponentProps = {
    size: 'small',
    dataSource: [{ name: 'Capdiem' }, { name: 'Joe' }, { name: 'James' }],
    columns: [
      { dataIndex: 'name', title: 'Name' },
      {
        title: 'Actions',
        key: 'actions',
        width: width,
        render: () => (
          <Dividers
            type="vertical"
            rows={[
              { label: '编辑', icon: <FormOutlined />, loading: editLoading },
              { label: '删除', icon: <DeleteOutlined /> },
            ]}
          />
        ),
      },
    ],
    rowKey: 'name',
  };

  return (
    <>
      <div>
        <Button
          type="primary"
          onClick={() => setEditLoading(!editLoading)}
          style={{ marginBottom: 8 }}
        >
          Loading
        </Button>

        <Slider
          min={80}
          max={150}
          tipFormatter={v => `Actions's width: ${v}`}
          value={width}
          onChange={setWidth}
        />
      </div>
      <Table {...props} />
    </>
  );
};

export default TableActions;
