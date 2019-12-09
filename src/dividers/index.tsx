import "antd/es/divider/style";

import Divider, { DividerProps } from "antd/es/divider";
import Radium from "radium";
import React from "react";

export interface DividerComponentProps {
  rows: React.ReactNode[];
  type?: DividerProps["type"];
  style?: React.CSSProperties;
  dividerVisible?: boolean;
  dividerStyle?: React.CSSProperties;
  rowStyle?: React.CSSProperties;
}

const Dividers: React.FC<DividerComponentProps> = ({
  rows,
  type = "horizontal",
  style = {},
  dividerStyle = {},
  dividerVisible = true,
  rowStyle = {},
}) => {
  const _dividerStyle: React.CSSProperties =
    type === "horizontal" ? { margin: "1px 0px -2px 0px" } : {};

  const _style: React.CSSProperties =
    type === "vertical" ? { display: "flex", justifyContent: "center" } : {};

  const _rowStyle: Radium.StyleProps['rules'] = {
    ":hover": {
      opacity: 0.7,
    },
    ...rowStyle,
  };

  return (
    <div style={{ textAlign: "center", ..._style, ...style }}>
      {rows
        .filter((row) => row !== undefined && row !== null && row !== false)
        .map((row, index) => (
          <div key={index}>
            {index !== 0 && dividerVisible && (
              <Divider style={{ ..._dividerStyle, ...dividerStyle }} type={type} />
            )}
            <span style={_rowStyle} key={index}>
              {row}
            </span>
          </div>
        ))}
    </div>
  );
};

export default Radium(Dividers);
