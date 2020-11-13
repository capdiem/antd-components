import { Divider } from 'antd';
import React from 'react';

import Basic from './components/basic';
import Images from './components/images';

const Index = (params: any) => {
  return (
    <>
      <Divider orientation="left">1. Basic</Divider>
      <Basic />
      <Divider orientation="left">2. Images</Divider>
      <Images />
    </>
  );
};

export default Index;
