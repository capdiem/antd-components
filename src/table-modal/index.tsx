import "antd/lib/modal/style";

import ConfigProvider from "antd/lib/config-provider";
import Modal, { ModalProps } from "antd/lib/modal";
import React from "react";

import { getConfigProviderProps } from "../";
import Filter from "../filter";
import Table from "../table";
import { TableComponentProps } from "../table/types";
import { TableModalComponentProps } from "./types";

const TableModal: React.FC<TableModalComponentProps<any, any>> = ({
  modal,
  table,
  filter,
  header,
}) => {
  const modalProps: ModalProps = {
    footer: modal.onOk ? undefined : false,
    ...modal,
  };

  const tableProps: TableComponentProps<any> = {
    size: "small",
    ...table,
  };

  return (
    <ConfigProvider {...getConfigProviderProps()}>
      <Modal {...modalProps}>
        {header}
        {filter && <Filter {...filter} />}
        <Table {...tableProps} />
      </Modal>
    </ConfigProvider>
  );
};

export default TableModal;
