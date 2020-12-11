import { Button, Radio } from 'antd';
import { DividerProps } from 'antd/lib/divider';
import { RadioChangeEvent } from 'antd/lib/radio';
import { Dividers } from 'components';
import React, { useState } from 'react';

import { AliyunOutlined, AmazonOutlined, SmileOutlined } from '@ant-design/icons';

const Multi = () => {
  const [type, setType] = useState<DividerProps['type']>('horizontal');
  const [visible, setVisible] = useState<boolean>(true);
  const [outerVisible, setOuterVisible] = useState<boolean>(true);

  function onChange(e: RadioChangeEvent) {
    setType(e.target.value);
  }

  function onShowChange(e: RadioChangeEvent) {
    setVisible(e.target.value);
  }

  function onShowOuterChange(e: RadioChangeEvent) {
    setOuterVisible(e.target.value);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <div>
          <Radio.Group onChange={onChange} value={type}>
            <Radio value={'horizontal'}>horizontal</Radio>
            <Radio value={'vertical'}>vertical</Radio>
          </Radio.Group>
        </div>
        <div>
          <Radio.Group onChange={onShowOuterChange} value={outerVisible}>
            <Radio value={true}>Show outer separator</Radio>
            <Radio value={false}>Hide outer separator</Radio>
          </Radio.Group>
        </div>
        <div>
          <Radio.Group onChange={onShowChange} value={visible}>
            <Radio value={true}>Show inner separator</Radio>
            <Radio value={false}>Hide inner separator</Radio>
          </Radio.Group>
        </div>
      </div>
      <div style={{ width: 220 }}>
        <Dividers
          type={type}
          dividerVisible={visible}
          outerDividerVisible={outerVisible}
          rows={[
            [
              { label: 'Custom Item', icon: <SmileOutlined /> },
              { label: 'Custom Item 2', icon: <SmileOutlined /> },
            ],
            [
              { label: 'Item 1', icon: <AmazonOutlined /> },
              { label: 'Item 2', icon: <AliyunOutlined /> },
            ],
            [
              { label: 'Item 1', icon: <AmazonOutlined /> },
              { label: 'Item 2', icon: <AliyunOutlined /> },
            ],
          ]}
        />
      </div>
    </div>
  );
};

export default Multi;
