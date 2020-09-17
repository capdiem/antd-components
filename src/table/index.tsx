import "antd/lib/table/style";
import "antd/lib/button/style";
import "antd/lib/modal/style";

import Button from "antd/lib/button";
import ConfigProvider from "antd/lib/config-provider";
import Modal from "antd/lib/modal";
import AntTable, { ColumnType } from "antd/lib/table";
import { TableProps } from "antd/lib/table/Table";
import React, { useState } from "react";

import { FullscreenOutlined } from "@ant-design/icons";

import { getConfigProviderProps } from "../";
import { TableColumnProps, TableComponentProps } from "./types";

const { Summary, Column, ColumnGroup } = AntTable;

function recursion(columns: TableColumnProps<any>[]) {
  return columns
    .filter((u) => u.visible === undefined || u.visible)
    .map((item) => {
      if (item.children) {
        item.children = recursion(item.children);
      }

      item.align = item.align || "center";

      return item;
    });
}

function Table<Record>(props: TableComponentProps<Record>) {
  const {
    fullscreen: fullscreenAbility,
    fullscreenWidth = "95%",
    fullscreenButtonProps = {},
    rowKey,
    columns,
    ...tableProps
  } = props;

  const [fullscreen, setFullscreen] = useState<boolean>(false);

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

  if (fullscreenAbility && fullscreen) {
    tableProps.scroll = {
      ...tableProps.scroll,
      y: "calc(100vh - 300px)",
    };
  }

  return (
    <ConfigProvider {...getConfigProviderProps()}>
      <div style={{ position: "relative" }}>
        {fullscreenAbility && (
          <Button
            type="link"
            icon={<FullscreenOutlined />}
            style={{ position: "absolute", zIndex: 1, right: 0 }}
            onClick={() => setFullscreen(true)}
            {...fullscreenButtonProps}
          />
        )}
        {!fullscreen && (
          <AntTable
            {...(tableProps as TableProps<any>)}
            columns={newColumns as ColumnType<any>[]}
            rowKey={(item) => getRowKey(item)}
          />
        )}
        <Modal
          visible={fullscreen}
          title={null}
          footer={null}
          centered
          closable={false}
          width={fullscreenWidth}
          onCancel={() => setFullscreen(false)}
        >
          {fullscreenAbility && (
            <AntTable
              {...(tableProps as TableProps<any>)}
              columns={newColumns as ColumnType<any>[]}
              rowKey={(item) => getRowKey(item)}
            />
          )}
        </Modal>
      </div>
    </ConfigProvider>
  );
}

Table.Column = Column;
Table.ColumnGroup = ColumnGroup;
Table.Summary = Summary;

export default Table;
