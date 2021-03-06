import { Radio, Tooltip } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { BlockText } from 'components';
import React, { useState } from 'react';

import { BlockTextComponentProps } from '../../../../../src/block-text';

const Basic = (params: any) => {
  const [position, setPosition] = useState<BlockTextComponentProps['tagPosition']>('outer');

  function onChange(e: RadioChangeEvent) {
    setPosition(e.target.value);
  }

  return (
    <>
      <Radio.Group onChange={onChange} value={position}>
        <Radio value={'outer'}>outer</Radio>
        <Radio value={'minor'}>minor</Radio>
      </Radio.Group>
      <BlockText
        major="ORDER_ID_20201118092334982"
        minor="2020-11-18 09:23:34"
        tags={[
          { text: '在线支付', color: 'blue', style: position === 'outer' ? { width: 34 } : {} },
          {
            text: (
              <Tooltip title="Try to click me">
                <a
                  onClick={() => {
                    alert('Thanks to click me!');
                  }}
                >
                  <span style={{ borderBottom: '1px dashed blue', color: 'blue' }}>click me!</span>
                </a>
              </Tooltip>
            ),
            style: position === 'outer' ? { width: 34 } : {},
          },
        ]}
        tagPosition={position}
      />
    </>
  );
};

export default Basic;
