import { ColumnProps, TableProps } from "antd/lib/table";

export type TableColumnProps<T> = Omit<ColumnProps<T>, "children"> & {
  visible?: boolean;
  children?: TableColumnProps<T>[];
};

export type TableComponentProps<T> = Omit<TableProps<T>, "rowKey" | "columns"> & {
  rowKey?: keyof T | (keyof T)[] | ((record: T) => string);
  columns?: TableColumnProps<T>[];
};
