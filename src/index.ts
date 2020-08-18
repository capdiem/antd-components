import zhCN from "antd/es/locale/zh_CN";
import { ConfigProviderProps } from "antd/lib/config-provider";

import BlockText from "./block-text";
import Dividers from "./dividers";
import EditableText from "./editable-text";
import Filter from "./filter";
import FormModal from "./form-modal";
import SubstringText from "./substring-text";
import Table from "./table";
import TableModal from "./table-modal";
import TableOperation from "./table-operation";

let global: ConfigProviderProps = {
  locale: zhCN,
};

function setConfigProviderProps(props: ConfigProviderProps) {
  global = {
    ...global,
    ...props,
  };
}

function getConfigProviderProps() {
  return global;
}

export {
  SubstringText,
  BlockText,
  EditableText,
  Filter,
  TableOperation,
  FormModal,
  Table,
  TableModal,
  Dividers,
  setConfigProviderProps,
  getConfigProviderProps,
};
