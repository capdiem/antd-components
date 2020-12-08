import { Divider } from 'antd';
import React from 'react';

import Basic from './components/basic';

const Index = (params: any) => {
  return (
    <>
      <Divider orientation="left">1. Basic</Divider>
      <Basic />
    </>
  );
};
export default Index;
