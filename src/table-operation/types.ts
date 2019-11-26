declare const Sizes: ["default", "small", "large"];

export interface Item {
  content: React.ReactNode;
  disabled?: boolean;
  visible?: boolean;
  onClick: () => void;
}

type Size = typeof Sizes[number];
type Items = Array<Item>;

export interface TableOperationComponentProps {
  items: Items;
  size?: Size;
  style?: React.CSSProperties;
}
