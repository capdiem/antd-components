import { ButtonProps } from "antd/lib/button";
import { PopconfirmProps as AntdPopconfirmProps } from "antd/lib/popconfirm";

import { DataEntryProps, Size, UploadFile, UploadProps } from "../form-modal/types";

declare type FormItemType =
  | "input"
  | "textarea"
  | "inputNumber"
  | "select"
  | "searchableSelect"
  | "dynamicSelect"
  | "dateRangePicker"
  | "datePicker"
  | "cascader"
  | "upload";
declare type ButtonMode = "default" | "upload" | "confirm";
declare type FilterItems<T> = Array<FilterItem<T>>;

declare type PopconfirmProps = Omit<AntdPopconfirmProps, "onConfirm">;

export type Btn<T = any> = Omit<ButtonProps, "onClick"> & {
  text?: string;
  mode?: ButtonMode;
  visible?: boolean;
  props?: PopconfirmProps | UploadProps;
  onClick?: ((values?: T) => void) | ((file: File) => Promise<UploadFile>);
};

export interface FilterItem<T = any> {
  label?: string;
  field: keyof T;
  placeholder?: string;
  visible?: boolean;
  type?: FormItemType;
  props?: DataEntryProps;
}

export declare type Btns<T = any> = Array<Btn<T>>;
export declare type BtnsGroups<T = any> = Array<Btns<T>>;

export declare type ReloadBtnRef = {
  handleClick: (query?: boolean) => void;
};

export interface FilterComponentProps<T = any> {
  style?: React.CSSProperties;
  query?: T;
  /** 默认值，调用`onReload`后设置的值 */
  defaultValues?: T;
  size?: Size;
  items?: Array<FilterItems<T>>;
  btns?: Btns | BtnsGroups;
  onSearch?: (values?: T) => void;
  onReload?: () => void;
  reloadBtnRef?: React.RefObject<ReloadBtnRef> | React.MutableRefObject<ReloadBtnRef>;
}
