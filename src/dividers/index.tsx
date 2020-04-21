import "antd/lib/divider/style";
import "antd/lib/tooltip/style";
import "antd/lib/button/style";

import Button from "antd/lib/button";
import Divider, { DividerProps } from "antd/lib/divider";
import Tooltip from "antd/lib/tooltip";
import Radium from "radium";
import React, { useEffect, useMemo, useRef, useState } from "react";
import stringWidth from "string-width";

import useSize from "@umijs/hooks/lib/useSize";

export interface Row {
  label: string;
  icon?: React.ReactNode;
  visible?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface DividerComponentProps {
  rows: React.ReactNode[] | Row[];
  type?: DividerProps["type"];
  style?: React.CSSProperties;
  dividerVisible?: boolean;
  dividerStyle?: React.CSSProperties;
  rowStyle?: React.CSSProperties;
}

function isRow(row: Row | React.ReactNode): row is Row {
  return Boolean(row) && (row as Row).label !== undefined;
}

const marginLeft = 4;

const Dividers: React.FC<DividerComponentProps> = ({
  rows,
  type = "horizontal",
  style = {},
  dividerStyle = {},
  dividerVisible = true,
  rowStyle = {},
}) => {
  const [size, divRef] = useSize<HTMLDivElement>();
  const widthRef = useRef<{ icon?: number; label?: number; full?: number }>({});
  const [sizeType, setSizeType] = useState<"icon" | "label" | "full">();

  useEffect(() => {
    if (isRow(rows[0])) {
      let iconPx = 0;
      let labelPx = 0;
      let fullPx = 0;

      if (type === "vertical") {
        (rows as Row[])
          .filter((u) => Object.keys(u).indexOf("visible") === -1 || u.visible)
          .forEach((u, i) => {
            /** icon width */
            if (u.icon) {
              iconPx += 14;
              if (i > 0) iconPx += 17;

              fullPx += 14;
            }

            /** divider width */
            if (i > 0) {
              labelPx += 17;
              fullPx += 17;
            }

            // TODO: 如果样式修改了fontSize，将不是7px。需要限制修改fontSize。
            /** single character width is 7 when font size is 14px */
            const px = stringWidth(u.label) * 7;
            labelPx += px;
            fullPx += px + marginLeft;
          });
      } else {
        const rowPxs = (rows as Row[]).map((u) => {
          let i = 0;
          let l = 0;
          let f = 0;
          if (u.icon) {
            i += 14;
            f += 14;
          }

          l += stringWidth(u.label) * 7;
          f += l + marginLeft;

          return [i, l, f, i + l + f];
        });

        rowPxs.sort((a, b) => a[3] - b[3]);
        const maxPx = rowPxs.pop();
        iconPx = maxPx[0];
        labelPx = maxPx[1];
        fullPx = maxPx[2];
      }

      widthRef.current.icon = iconPx;
      widthRef.current.label = labelPx;
      widthRef.current.full = fullPx;
    }
  }, []);

  useMemo(() => {
    if (widthRef.current.full) {
      if (size.width > widthRef.current.full) {
        setSizeType("full");
      } else if (size.width > widthRef.current.label || widthRef.current.icon === 0) {
        setSizeType("label");
      } else {
        setSizeType("icon");
      }
    }
  }, [size.width]);

  const _dividerStyle: React.CSSProperties =
    type === "horizontal" ? { margin: "1px 0px -2px 0px" } : {};

  const _style: React.CSSProperties =
    type === "vertical" ? { display: "flex", justifyContent: "center" } : {};

  const _rowStyle: Radium.StyleProps["rules"] = {
    ":hover": {
      opacity: 0.7,
    },
    ...rowStyle,
  };

  function renderRow(row: React.ReactNode | Row) {
    if (isRow(row)) {
      const node = (type: string) => (
        <Button
          onClick={row.onClick}
          type="link"
          style={{ padding: 0, height: "inherit", borderWidth: 0 }}
          disabled={row.disabled}
        >
          {type !== "label" && row.icon}
          {type !== "icon" && (
            <span style={{ marginLeft: type === "full" ? marginLeft : 0 }}>{row.label}</span>
          )}
        </Button>
      );

      if (sizeType === "icon") {
        if (row.icon) {
          return <Tooltip title={row.label}>{node(sizeType)}</Tooltip>;
        } else {
          return node("label");
        }
      } else {
        return node(sizeType);
      }
    } else {
      return row;
    }
  }

  return (
    <div style={{ textAlign: "center", ..._style, ...style }} ref={divRef}>
      {rows
        .filter((row) => !!row)
        .map((row, index) => {
          return (
            <div key={index}>
              {index !== 0 && dividerVisible && (
                <Divider style={{ ..._dividerStyle, ...dividerStyle }} type={type} />
              )}
              <span style={_rowStyle} key={index}>
                {renderRow(row)}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default Radium(Dividers);
