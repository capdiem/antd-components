import { TableProps } from "antd/lib/table";

export type TableComponentProps<T> = Omit<TableProps<T>, "rowKey"> & {
  rowKey?: keyof T | (keyof T)[] | ((record: T) => string);
};
