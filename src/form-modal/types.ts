import { UploadFile } from "antd/es/upload/interface";
import { FieldProps } from "rc-field-form/lib/Field";

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
  "switch",
  "upload-image",
  "upload-images"
];

declare const Sizes: ["default", "small", "large"];

type FormItemType = typeof FormItemTypes[number];
type Size = typeof Sizes[number];
type SelectOption = { label: string; value: string | number; disabled?: boolean };
type FormItems<T> = Array<FormItem<T>>;
type SimpleUploadFile = Required<Pick<UploadFile, "uid" | "url">>;

export interface PlainItemGroup<T = any> {
  key: string;
  title: React.ReactNode;
  items: PlainItem<T>[];
}

export interface PlainItem<T = any> {
  type?: FormItemType;
  label: string;
  field: Extract<keyof T, string>;
  placeholder?: string;
  options?: Array<SelectOption>;
  readonly?: boolean;
  showTime?: boolean;
  onUpload?: (file: File) => Promise<{ uid: string; url: string }>;
  onPreview?: (file: UploadFile<any>) => void;
  [prop: string]: any;
}

export interface FormItem<T = any> extends PlainItem<T>, FieldProps {
  required?: boolean;
  visible?: boolean;
}

export interface FormModalComponentProps<T = any> {
  title?: React.ReactNode;
  tips?: React.ReactNode;
  visible: boolean;
  formItems: FormItems<T>;
  formItemCol?: {
    lg: number;
    md: number;
    sm: number;
    xs: number;
  };
  maskClosable?: boolean;
  initialValues?: T;
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
