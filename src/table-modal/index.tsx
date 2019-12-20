import "antd/es/modal/style";

import Modal from "antd/es/modal";
import { ModalProps } from "antd/lib/modal";
import React from "react";

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
    <Modal {...modalProps}>
      {header}
      {filter && <Filter {...filter} />}
      <Table {...tableProps} />
    </Modal>
  );
};

export default TableModal;
