import { Table as AntdTable } from "antd";
import { ColumnProps } from "antd/lib/table";
import React from "react";

import { ListComponentProps } from "./types";

function recursion(columns: ColumnProps<any>[]) {
  return columns.map((item) => {
    if (item.children) {
      item.children = recursion(item.children);
    } else if (!item.align) {
      item.align = "center";
    }

    return item;
  });
}

const Table: React.FC<ListComponentProps<any>> = ({ rowKey, columns, ...tableProps }) => {
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
