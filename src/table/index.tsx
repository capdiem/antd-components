import "antd/es/table/style";

import AntdTable from "antd/es/table";
import React from "react";

import { TableColumnProps, TableComponentProps } from "./types";

function recursion(columns: TableColumnProps<any>[]) {
  return columns
    .filter((u) => u.visible === undefined || u.visible)
    .map((item) => {
      if (item.children) {
        item.children = recursion(item.children);
      } else if (!item.align) {
        item.align = "center";
      }

      return item;
    });
}

const Table: React.FC<TableComponentProps<any>> = ({ rowKey, columns, ...tableProps }) => {
  function getRowKey(item: any) {
    if (rowKey) {
      if (typeof rowKey === "string") {
        return item[rowKey];
      } else if (typeof rowKey === "object") {
        return rowKey.map((prop) => item[prop]).join("");
      } else if (typeof rowKey === "function") {
        return rowKey(item);
      }
    } else {
      return rowKey;
    }
  }

  const newColumns = columns ? recursion(columns) : undefined;

  return <AntdTable {...tableProps} columns={newColumns} rowKey={(item) => getRowKey(item)} />;
};

export default Table;
