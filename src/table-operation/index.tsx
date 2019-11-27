import "antd/es/icon/style";
import "antd/es/button/style";
import "antd/es/dropdown/style";
import "antd/es/menu/style";

import Button from "antd/es/button";
import Dropdown from "antd/es/dropdown";
import Icon from "antd/es/icon";
import Menu from "antd/es/menu";
import React from "react";

import { Items, TableOperationComponentProps } from "./types";

const { Item: MenuItem, Divider: MenuDivider } = Menu;

const TableOperation: React.FC<TableOperationComponentProps> = ({
  style,
  items = [],
  itemGroups = [],
  size = "default",
}) => {
  if (items.length > 0) {
    itemGroups.push(items);
  }

  const menuItems: React.ReactNode[] = [];

  itemGroups.forEach((s: Items) => {
    const group = s
      .filter((u) => u.visible === undefined || u.visible === true)
      .map((u, i) => {
        const { content, icon, disabled = false, onClick = () => {} } = u;

        return (
          <MenuItem onClick={onClick} disabled={disabled} key={i}>
            {icon && <Icon type={icon} />}
            {content}
          </MenuItem>
        );
      });

    if (group.length > 0) {
      menuItems.push(...group);
      menuItems.push(<MenuDivider />);
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
        <Icon type="bars" />
        <Icon type="down" />
      </Button>
    </Dropdown>
  );
};

export default TableOperation;
