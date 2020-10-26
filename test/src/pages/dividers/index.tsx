import { Divider } from 'antd';
import React from 'react';

import Basic from './components/basic';
import TableActions from './components/table-actions';

const Index = (params: any) => {
  return (
    <>
      <Divider orientation="left">1. Basic</Divider>
      <Basic />
      <Divider orientation="left">2. Actions in Table Component</Divider>
      <TableActions />
    </>
  );
};
export default Index;
