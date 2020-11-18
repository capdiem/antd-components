import { Divider } from 'antd';
import React from 'react';

import Basic from './components/basic';
import FilterMode from './components/filter-mode';

const Index = (params: any) => {
  return (
    <>
      <Divider orientation="left">1. Basic</Divider>
      <Basic />
      <Divider orientation="left">2. Filter Mode</Divider>
      <FilterMode />
    </>
  );
};

export default Index;
