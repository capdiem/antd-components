import "antd/lib/icon/style";
import "antd/lib/button/style";
import "antd/lib/dropdown/style";
import "antd/lib/menu/style";

import Button from "antd/lib/button";
import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
import React from "react";

import { BarsOutlined, DownOutlined } from "@ant-design/icons";

import { Items, TableOperationComponentProps } from "./types";

const { Item: MenuItem, Divider: MenuDivider } = Menu;

const TableOperation: React.FC<TableOperationComponentProps> = ({
  style,
  items = [],
  itemGroups = [],
  size = "middle",
}) => {
  if (items.length > 0) {
    itemGroups.push(items);
  }

  const menuItems: React.ReactNode[] = [];

  itemGroups.forEach((s: Items, n: number) => {
    const group = s
      .filter((u) => u.visible === undefined || u.visible === true)
      .map((u, i) => {
        const { content, icon, onClick, disabled = false } = u;

        function handleOnClick() {
          typeof onClick === "function" && onClick();
        }

        return (
          <MenuItem onClick={handleOnClick} disabled={disabled} key={i}>
            {icon}
            {content}
          </MenuItem>
        );
      });

    if (group.length > 0) {
      menuItems.push(...group);
      if (n !== itemGroups.length - 1) {
        menuItems.push(<MenuDivider />);
      }
    }
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
        <BarsOutlined />
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default TableOperation;
