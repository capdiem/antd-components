import "antd/es/divider/style";

import Divider, { DividerProps } from "antd/es/divider";
import React from "react";

export interface DividerComponentProps {
  rows: React.ReactNode[];
  type?: DividerProps["type"];
  style?: React.CSSProperties;
  dividerStyle?: React.CSSProperties;
  rowStyle?: React.CSSProperties;
}

const Dividers: React.FC<DividerComponentProps> = ({
  rows,
  type = "horizontal",
  style = {},
  dividerStyle = {},
  rowStyle = {},
}) => {
  const _dividerStyle: React.CSSProperties =
    type === "horizontal" ? { margin: "1px 0px -2px 0px" } : {};

  const _style: React.CSSProperties =
    type === "vertical" ? { display: "flex", justifyContent: "center" } : {};

  return (
    <div style={{ textAlign: "center", ..._style, ...style }}>
      {rows
        .filter((row) => !!row)
        .map((row, index) => (
          <div key={index} style={rowStyle}>
            {index !== 0 && <Divider style={{ ..._dividerStyle, ...dividerStyle }} type={type} />}
            {row}
          </div>
        ))}
    </div>
  );
};

export default Dividers;
