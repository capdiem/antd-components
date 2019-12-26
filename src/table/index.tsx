import "antd/es/table/style";

import Button from "antd/es/button";
import Modal from "antd/es/modal";
import AntdTable from "antd/es/table";
import React, { useState } from "react";

import { FullscreenOutlined } from "@ant-design/icons";

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

const Table: React.FC<TableComponentProps<any>> = ({
  fullscreen: fullscreenAbility,
  fullscreenWidth = "95%",
  rowKey,
  columns,
  ...tableProps
}) => {
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
    <div style={{ position: "relative" }}>
      {fullscreenAbility && (
        <Button
          type="dashed"
          icon={<FullscreenOutlined />}
          style={{ position: "absolute", zIndex: 1, left: 0 }}
          onClick={() => setFullscreen(true)}
        />
      )}
      {!fullscreen && (
        <AntdTable {...tableProps} columns={newColumns} rowKey={(item) => getRowKey(item)} />
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
          <AntdTable {...tableProps} columns={newColumns} rowKey={(item) => getRowKey(item)} />
        )}
      </Modal>
    </div>
  );
};

export default Table;
