import { Radio } from 'antd';
import { DividerProps } from 'antd/lib/divider';
import { RadioChangeEvent } from 'antd/lib/radio';
import { Dividers } from 'components';
import React, { useState } from 'react';

import { AliyunOutlined, AmazonOutlined, SmileOutlined } from '@ant-design/icons';

const Basic = () => {
  const [type, setType] = useState<DividerProps['type']>('horizontal');
  const [visible, setVisible] = useState<boolean>(true);

  function onChange(e: RadioChangeEvent) {
    setType(e.target.value);
  }

  function onShowChange(e: RadioChangeEvent) {
    setVisible(e.target.value);
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
          <Radio.Group onChange={onShowChange} value={visible}>
            <Radio value={true}>Show separator</Radio>
            <Radio value={false}>Hide separator</Radio>
          </Radio.Group>
        </div>
      </div>
      <div style={{ width: 150 }}>
        <Dividers
          type={type}
          dividerVisible={visible}
          rows={[
            { label: 'Item 1', icon: <AmazonOutlined /> },
            { label: 'Item 2', icon: <AliyunOutlined /> },
          ]}
        />
      </div>
    </div>
  );
};

export default Basic;
