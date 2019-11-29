import "antd/es/divider/style";

import Divider, { DividerProps } from "antd/es/divider";
import React from "react";

export interface DividerComponentProps {
  rows: React.ReactNode[];
  type?: DividerProps["type"];
  style?: React.CSSProperties;
}

const Dividers: React.FC<DividerComponentProps> = ({ rows, type = "horizontal", style = {} }) => {
  const baseStyle: React.CSSProperties =
    type === "horizontal" ? { margin: "1px 0px -2px 0px" } : {};

  return (
    <div>
      {rows.map((row, index) => (
        <div key={index}>
          {index !== 0 && <Divider style={{ ...baseStyle, ...style }} />}
          {row}
        </div>
      ))}
    </div>
  );
};

export default Dividers;
