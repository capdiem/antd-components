import { Button, Radio } from 'antd';
import { DividerProps } from 'antd/lib/divider';
import { RadioChangeEvent } from 'antd/lib/radio';
import { Dividers } from 'components';
import React, { useState } from 'react';

import { AliyunOutlined, AmazonOutlined, SmileOutlined } from '@ant-design/icons';

const Basic = () => {
  const [type, setType] = useState<DividerProps['type']>('horizontal');

  function onChange(e: RadioChangeEvent) {
    setType(e.target.value);
  }

  return (
    <>
      <Radio.Group onChange={onChange} value={type}>
        <Radio value={'horizontal'}>horizontal</Radio>
        <Radio value={'vertical'}>vertical</Radio>
      </Radio.Group>
      <Dividers
        type={type}
        rows={[
          { label: 'Item 1', icon: <AmazonOutlined /> },
          { label: 'Item 2', icon: <AliyunOutlined /> },
        ]}
      />
    </>
  );
};

export default Basic;
