import "antd/es/icon/style";
import "antd/es/button/style";
import "antd/es/dropdown/style";
import "antd/es/menu/style";

import Button from "antd/es/button";
import Dropdown from "antd/es/dropdown";
import Icon from "antd/es/icon";
import Menu from "antd/es/menu";
import React from "react";

import { TableOperationComponentProps } from "./types";

const { Item: MenuItem } = Menu;

const TableOperation: React.FC<TableOperationComponentProps> = ({
  style,
  items = [],
  size = "default",
}) => {
  const menuItems = items
    .filter((u) => u.visible === undefined || u.visible === true)
    .map((item, index) => {
      const { content, onClick = () => {} } = item;

      return (
        <MenuItem onClick={onClick} key={index}>
          {content}
        </MenuItem>
      );
    });

  const rootStyle = {
    padding: "0px 12px",
    lineHeight: "24px",
    height: "24px",
    ...style,
  };

  return (
    <Dropdown overlay={<Menu>{menuItems}</Menu>} trigger={["click"]}>
      <Button size={size} style={rootStyle}>
        <Icon type="bars" />
        <Icon type="down" />
      </Button>
    </Dropdown>
  );
};

export default TableOperation;
