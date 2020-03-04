import { CascaderProps } from "antd/lib/cascader";
import { ColProps } from "antd/lib/col";
import {} from "antd/lib/config-provider";
import {
  PickerDateProps,
  PickerProps,
  RangePickerDateProps,
  RangePickerProps as AntdRangePickerProps,
} from "antd/lib/date-picker/generatePicker";
import { FormProps as AntdFormProps } from "antd/lib/form/Form";
import FormItem, { FormItemProps as AntdFormItemProps } from "antd/lib/form/FormItem";
import { InputProps, TextAreaProps } from "antd/lib/input";
import { InputNumberProps } from "antd/lib/input-number";
import { ModalProps as AntdModalProps } from "antd/lib/modal";
import { SelectProps as AntdSelectProps } from "antd/lib/select";
import { SwitchProps } from "antd/lib/switch";
import { TreeSelectProps } from "antd/lib/tree-select";
import {
  UploadFile as AntdUploadField,
  UploadProps as AntdUploadProps,
} from "antd/lib/upload/interface";
import { Moment } from "moment";
import { FieldProps as RcFieldProps } from "rc-field-form/lib/Field";
import { PickerPanelDateProps } from "rc-picker/lib/PickerPanel";
import { OptionData } from "rc-select/lib/interface";

export declare type DataEntryType =
  | "input"
  | "inputNumber"
  | "password"
  | "select"
  | "searchableSelect"
  | "dynamicSelect"
  | "treeSelect"
  | "time"
  | "cascader"
  | "upload-excel"
  | "textarea"
  | "switch"
  | "upload-image"
  | "upload-images";
export declare type Size = "large" | "default" | "small";

export declare type UploadFile = Pick<AntdUploadField, "url"> & {
  id: number | string;
};
export declare type FieldProps = Omit<RcFieldProps, "name">;
export declare type UploadProps = AntdUploadProps & {
  onUpload?: (file: File) => Promise<UploadFile>;
};
export declare type SelectProps = Omit<AntdSelectProps<any>, "options"> & {
  options: OptionData[];
};
declare type PickerSharedProps<DateType> = Pick<
  PickerProps<DateType>,
  | "allowClear"
  | "autoFocus"
  | "className"
  | "disabled"
  | "dropdownClassName"
  | "getPopupContainer"
  | "open"
  | "placeholder"
  | "popupStyle"
  | "suffixIcon"
  | "onOpenChange"
  | "onPanelChange"
  | "picker"
  | "defaultValue"
  | "defaultPickerValue"
  | "disabledDate"
  | "locale"
  | "mode"
  | "style"
  | "dateRender"
>;

declare type BasicPickerProps<DateType> = PickerSharedProps<DateType> &
  Pick<
    PickerDateProps<DateType>,
    "defaultValue" | "defaultPickerValue" | "format" | "renderExtraFooter" | "value" | "onChange"
  >;

export declare type YearPickerProps<DateType = Moment> = BasicPickerProps<DateType>;
export declare type MonthPickerProps<DateType = Moment> = BasicPickerProps<DateType>;
export declare type WeekPickerProps<DateType = Moment> = BasicPickerProps<DateType>;
export declare type DatePickerProps<DateType = Moment> = BasicPickerProps<DateType> &
  Pick<
    PickerPanelDateProps<DateType>,
    "disabledTime" | "showTime" | "showToday" | "onOk" | "onPanelChange"
  >;
export declare type RangePickerProps<DateType = Moment> = BasicPickerProps<DateType> &
  Pick<
    AntdRangePickerProps<DateType>,
    "allowEmpty" | "disabled" | "disabledTime" | "ranges" | "separator" | "onCalendarChange"
  > &
  Pick<RangePickerDateProps<DateType>, "showTime">;

export declare type FormItemProps = Partial<Omit<AntdFormItemProps, "fieldKey">>;

export declare type SharedDataEntryProps =
  | InputProps
  | InputNumberProps
  | TextAreaProps
  | SelectProps
  | TreeSelectProps<any>
  | CascaderProps
  | SwitchProps
  | UploadProps
  | DatePickerProps
  | YearPickerProps
  | MonthPickerProps
  | WeekPickerProps
  | RangePickerProps;

export declare type DataEntryProps = SharedDataEntryProps & { placeholder?: string };

export interface FormItem<VT = any> extends FormItemProps {
  visible?: boolean;
  type?: DataEntryType;
  props?: DataEntryProps;
  label?: string;
  field: Extract<keyof VT, string>;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  col?: ColProps;
}

export interface FormItemsGroup<VT = any> {
  key?: string;
  title?: React.ReactNode;
  orientation?: "left" | "right" | "center";
  dashed?: boolean;
  style?: React.CSSProperties;
  formItems: Array<FormItem<VT>>;
}

declare type ModalProps = Omit<AntdModalProps, "onOk" | "onCancel">;
declare type FormProps = Pick<
  AntdFormProps,
  "hideRequiredMark" | "colon" | "name" | "layout" | "labelAlign"
>;

export interface FormModalComponentProps<VT = any> extends ModalProps, FormProps {
  formItems?: Array<FormItem<VT>>;
  formItemsGroups?: Array<FormItemsGroup<VT>>;
  formItemStyle?: React.CSSProperties;
  hasFeedback?: boolean;
  initialValues?: VT;
  /** use defaultValues as initialValues if initialValues do not exists and defaultValues exists */
  defaultValues?: VT;
  labelCol?: ColProps | number;
  wrapperCol?: ColProps | number;
  formItemCol?: ColProps | number;
  size?: Size;
  tips?: React.ReactNode;
  onCancel: () => void;
  onOk: (values: any) => Promise<any> | void;
}
