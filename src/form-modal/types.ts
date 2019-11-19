import { FormComponentProps, ValidationRule } from "antd/lib/form";

declare const FormItemTypes: [
  "input",
  "inputNumber",
  "password",
  "select",
  "searchableSelect",
  "dynamicSelect",
  "time",
  "cascader",
  "upload-excel",
  "textarea",
  "switch"
];

declare const Sizes: ["default", "small", "large"];

type FormItemType = typeof FormItemTypes[number];
type Size = typeof Sizes[number];
type SelectOption = { label: string; value: string | number };
type FormItems = Array<FormItem>;

export interface PlainItemGroup {
  title: string;
  items: PlainItem[];
}

export interface PlainItem {
  type?: FormItemType;
  label: string;
  field: string;
  placeholder?: string;
  options?: Array<SelectOption>;
  readonly?: boolean;
  showTime?: boolean;
  [prop: string]: any;
}

export interface FormItem extends PlainItem {
  required?: boolean;
  initialValue?: any;
  visible?: boolean;
  rules?: Array<ValidationRule>;
}

export interface FormModalComponentProps extends FormComponentProps {
  title?: React.ReactNode;
  tips?: React.ReactNode;
  visible: boolean;
  formItems: FormItems;
  formItemCol?: {
    lg: number;
    md: number;
    sm: number;
    xs: number;
  };
  maskClosable?: boolean;
  initialData?: any;
  labelCol?: number | {};
  wrapperCol?: number | {};
  hasFeedback?: boolean;
  formItemStyle?: {};
  confirmLoading?: boolean;
  size?: Size;
  onOk: (values: any) => Promise<any> | undefined;
  onCancel: () => void;
  [prop: string]: any;
}
