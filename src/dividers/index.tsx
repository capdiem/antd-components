import "antd/es/divider/style";

import Divider, { DividerProps } from "antd/es/divider";
import React from "react";

export interface DividerComponentProps {
  rows: React.ReactNode[];
  type?: DividerProps["type"];
  style?: React.CSSProperties;
  rowStyle?: React.CSSProperties;
}

const Dividers: React.FC<DividerComponentProps> = ({
  rows,
  type = "horizontal",
  style = {},
  rowStyle = {},
}) => {
  const baseStyle: React.CSSProperties =
    type === "horizontal" ? { margin: "1px 0px -2px 0px" } : {};

  return (
    <div>
      {rows.map((row, index) => (
        <div key={index} style={rowStyle}>
          {index !== 0 && <Divider style={{ ...baseStyle, ...style }} type={type} />}
          {row}
        </div>
      ))}
    </div>
  );
};

export default Dividers;
