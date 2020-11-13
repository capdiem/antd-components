import { Layout, Menu } from 'antd';
import React from 'react';
import { history } from 'umi';

const { Header, Content, Sider } = Layout;

const BasicLayout: React.FC = ({ children }) => {
  const onMenuClick = ({ item, key, keyPath }: any) => {
    // console.log('item, key, keyPath', item, key, keyPath);
    history.push({
      pathname: '/' + key,
    });
  };

  return (
    <Layout style={{ height: '100%' }}>
      <Header>
        <h1 style={{ color: 'white' }}>🎉Welcome to antd-components!</h1>
      </Header>
      <Layout>
        <Sider theme="light" style={{ background: 'none', margin: 24 }}>
          <Menu onClick={onMenuClick} style={{ background: 'white', height: '100%' }}>
            <Menu.Item key="blockText">BlockText</Menu.Item>
            <Menu.Item key="dividers">Dividers</Menu.Item>
            <Menu.Item key="editableText">EditableText</Menu.Item>
            <Menu.Item key="filter">Filter</Menu.Item>
            <Menu.Item key="form-modal">FormModal</Menu.Item>
            <Menu.Item key="substringText">SubstringText</Menu.Item>
            <Menu.Item key="table">Table</Menu.Item>
            <Menu.Item key="tableModal">TableModal</Menu.Item>
            <Menu.Item key="tableOperation">TableOperation</Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ margin: '24px 24px 24px 0', padding: 24, background: 'white' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
