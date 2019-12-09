import Col from 'antd/es/col';
import Row from 'antd/es/row';
import React from 'react';

// import { Dividers } from "../../../src";
import { Dividers } from '../../../lib';
import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <Row gutter={8}>
        <Col span={4}>
          <h1>Dividers</h1>
          <Dividers rows={[<a key="1">Action 1</a>, <a key="2">Action 2</a>]} type="vertical" />
        </Col>
      </Row>
    </div>
  );
}
