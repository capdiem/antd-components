import { RcFile } from "antd/es/upload";
import { UploadFile } from "antd/es/upload/interface";
import { ValidationRule } from "antd/lib/form";

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

export interface PlainItem<T> {
  type?: FormItemType;
  label: string;
  field: Extract<keyof T, string>;
  placeholder?: string;
  options?: Array<SelectOption>;
  readonly?: boolean;
  showTime?: boolean;
  beforeUpload?: (file: RcFile, fileList: RcFile[]) => Promise<any>;
  onPreview?: (file: UploadFile<any>) => void;
  [prop: string]: any;
}

export interface FormItem<T = any> extends PlainItem<T> {
  required?: boolean;
  initialValue?: SimpleUploadFile | any;
  visible?: boolean;
  rules?: Array<ValidationRule>;
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
  initialData?: T;
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
