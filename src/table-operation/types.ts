import { Size } from "../form-modal/types";

export interface Item {
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  visible?: boolean;
  onClick: () => void;
}

export type Items = Array<Item>;

export interface TableOperationComponentProps {
  items?: Items;
  itemGroups?: Items[];
  size?: Size;
  style?: React.CSSProperties;
}
