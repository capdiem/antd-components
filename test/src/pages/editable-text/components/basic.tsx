import { Radio } from 'antd';
import { EditableText } from 'components';
import React, { useState } from 'react';

const Basic = () => {
  const [initialValue, setInitialValue] = useState<string>('Click me to change me!');
  const [display, setDisplay] = useState<'link' | 'text'>('link');

  return (
    <>
      <Radio.Group onChange={e => setDisplay(e.target.value)} defaultValue={display}>
        <Radio value="link">Link</Radio>
        <Radio value="text">Text</Radio>
      </Radio.Group>

      <EditableText
        initialValue={initialValue}
        type="input"
        style={display}
        onOk={value => {
          setInitialValue(value);
        }}
      >
        {initialValue}
      </EditableText>
      <span>Changed value: {initialValue}</span>
    </>
  );
};

export default Basic;
