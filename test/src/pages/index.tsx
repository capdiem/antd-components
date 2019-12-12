/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/heading-has-content */
import Button from "antd/es/button";
import Col from "antd/es/col";
import Row from "antd/es/row";
import React, { useEffect, useState } from "react";

import { Dividers, Table } from "../../../src";
import { TableColumnProps } from "../../../src/table/types";
// import { Dividers, Table } from '../../../lib';
import styles from "./index.css";

export default function() {
  const [columns, setColumns] = useState<TableColumnProps<any>[]>([]);

  useEffect(() => {
    setColumns([
      { dataIndex: 'name', title: '名称' },
      { dataIndex: 'age', title: '年龄' },
      { dataIndex: 'gender', title: '性别' },
    ]);
  }, []);

  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
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
          />
        </Col>
      </Row>
    </div>
  );
}
