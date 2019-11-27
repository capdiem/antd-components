declare const Sizes: ["default", "small", "large"];

export interface Item {
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  visible?: boolean;
  onClick: () => void;
}

type Size = typeof Sizes[number];
export type Items = Array<Item>;

export interface TableOperationComponentProps {
  items?: Items;
  itemGroups?: Items[];
  size?: Size;
  style?: React.CSSProperties;
}
