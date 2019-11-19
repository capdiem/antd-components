import { ButtonProps } from "antd/lib/button";
import { CascaderOptionType } from "antd/lib/cascader";
import { FormComponentProps } from "antd/lib/form";

declare const FormItemTypes: [
  "input",
  "textarea",
  "inputNumber",
  "select",
  "searchableSelect",
  "dynamicSelect",
  "dateRangePicker",
  "datePicker",
  "cascader",
  "upload"
];

declare const Sizes: ["default", "small", "large"];

declare const ButtonModes: ["default", "upload", "confirm"];

type FormItemType = typeof FormItemTypes[number];
type ButtonMode = typeof ButtonModes[number];
type Size = typeof Sizes[number];
type SelectOption = { label: string; value: string | number };
type FilterFormItems<T> = Array<FilterFormItem<T>>;

export type Btn<T> = Omit<ButtonProps, "onClick"> & {
  text?: string;
  mode?: ButtonMode;
  visible?: boolean;
  confirmTitle?: string;
  confirmText?: string;
  onClick?: (values?: T) => void;
  [prop: string]: any;
};

export interface FilterFormItem<T> {
  label?: string;
  field: keyof T;
  placeholder?: string;
  type?: FormItemType;
  options?: Array<SelectOption> | Array<CascaderOptionType>;
  [prop: string]: any;
}

export interface FilterComponentProps<T = any> extends FormComponentProps {
  style?: React.CSSProperties;
  initialValues?: T;
  size?: Size;
  formItemsGroups?: Array<FilterFormItems<T>>;
  btns?: Array<Btn<T>>;
  btnGroups?: Array<Array<Btn<T>>>;
  onSearch?: (values?: T) => void;
  onReload?: () => void;
  onRefReloadBtn?: (ref: any) => void;
}
