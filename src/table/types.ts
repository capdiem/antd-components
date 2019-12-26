import { ColumnType } from "antd/lib/table/interface";
import { TableProps } from "antd/lib/table/Table";

export type TableColumnProps<T> = Omit<ColumnType<T>, "children"> & {
  visible?: boolean;
  children?: TableColumnProps<T>[];
};

export type TableComponentProps<T> = Omit<TableProps<T>, "rowKey" | "columns" | "scroll"> & {
  fullscreen?: boolean;
  fullscreenWidth?: string | number;
  rowKey?: keyof T | (keyof T)[] | ((record: T) => string);
  columns?: TableColumnProps<T>[];
  scroll: {
    x?: number | true | string;
    y?: number | true | string;
    scrollToFirstRowOnChange?: boolean;
  };
};
