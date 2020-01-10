import { ButtonProps } from "antd/lib/button";
import { CascaderProps } from "antd/lib/cascader";
import { InputProps, TextAreaProps } from "antd/lib/input";
import { InputNumberProps } from "antd/lib/input-number";
import { PopconfirmProps as AntdPopconfirmProps } from "antd/lib/popconfirm";
import { SwitchProps } from "antd/lib/switch";

import {
  DatePickerProps,
  MonthPickerProps,
  RangePickerProps,
  SelectProps,
  Size,
  UploadFile,
  UploadProps,
  WeekPickerProps,
  YearPickerProps,
} from "../form-modal/types";

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
  props?:
    | InputProps
    | InputNumberProps
    | TextAreaProps
    | SelectProps
    | CascaderProps
    | SwitchProps
    | UploadProps
    | DatePickerProps
    | YearPickerProps
    | MonthPickerProps
    | WeekPickerProps
    | RangePickerProps;
}

export declare type Btns<T = any> = Array<Btn<T>>;
export declare type BtnsGroups<T = any> = Array<Btns<T>>;

export declare type ReloadBtnRef = {
  handleClick: (query?: boolean) => void;
};

export interface FilterComponentProps<T = any> {
  style?: React.CSSProperties;
  /** 初始值，会和默认值合并，优先级大于默认值 */
  initialValues?: T;
  /** 默认值，调用`onReload`后设置的值 */
  defaultValues?: T;
  size?: Size;
  items?: Array<FilterItems<T>>;
  btns?: Btns | BtnsGroups;
  onSearch?: (values?: T) => void;
  onReload?: () => void;
  reloadBtnRef?: React.RefObject<ReloadBtnRef> | React.MutableRefObject<ReloadBtnRef>;
}
