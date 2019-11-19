import { ModalProps } from "antd/lib/modal";

import { FilterComponentProps } from "../filter/types";
import { TableComponentProps } from "../table/types";

export interface TableModalComponentProps<T, F> {
  modal: ModalProps;
  table: TableComponentProps<T>;
  filter?: FilterComponentProps<F>;
  header?: React.ReactElement;
}
