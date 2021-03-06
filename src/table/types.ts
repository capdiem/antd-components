import { ColumnType } from "antd/lib/table/interface";
import { TableProps } from "antd/lib/table/Table";
import { ButtonProps } from "antd/lib/button";
import { FilterComponentProps } from "../filter/types";

export type TableColumnProps<T = any> = Omit<ColumnType<T>, "children" | "dataIndex"> & {
  visible?: boolean;
  /** TODO: How to get nested object keys? */
  dataIndex?: keyof T | [keyof T, ...string[]] | number | number[];
  children?: TableColumnProps<T>[];
};

export type TableComponentProps<T = any, F = any> = Omit<
  TableProps<T>,
  "rowKey" | "columns" | "scroll"
> & {
  filter?: FilterComponentProps<F>;
  fullscreen?: boolean;
  fullscreenWidth?: string | number;
  fullscreenButtonProps?: Omit<ButtonProps, "onClick">;
  rowKey?: keyof T | (keyof T)[] | ((record: T) => string);
  columns?: TableColumnProps<T>[];
  scroll?: {
    x?: number | true | string;
    y?: number | true | string;
    scrollToFirstRowOnChange?: boolean;
  };
};
