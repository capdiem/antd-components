import { TableProps } from "antd/lib/table";

export type ListComponentProps<T> = Omit<TableProps<T>, "rowKey"> & {
  rowKey?: keyof T | (keyof T)[] | ((record: T) => string);
};
