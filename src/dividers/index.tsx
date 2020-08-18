import "antd/lib/divider/style";
import "antd/lib/tooltip/style";
import "antd/lib/button/style";

import Button from "antd/lib/button";
import ConfigProvider from "antd/lib/config-provider";
import Divider, { DividerProps } from "antd/lib/divider";
import Tooltip from "antd/lib/tooltip";
import Radium from "radium";
import React, { useEffect, useMemo, useRef, useState } from "react";
import stringWidth from "string-width";

import useSize from "@umijs/hooks/lib/useSize";

import { getConfigProviderProps } from "../";

export interface Row {
  label: string;
  icon?: React.ReactNode;
  visible?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export type Rows = React.ReactNode[] | Row[];
export type RowsGroups = Array<Rows>;

export interface DividerComponentProps {
  rows: Rows | RowsGroups;
  type?: DividerProps["type"];
  style?: React.CSSProperties;
  dividerVisible?: boolean;
  dividerStyle?: React.CSSProperties;
  outerDividerVisible?: boolean;
  outerDividerStyle?: React.CSSProperties;
  rowStyle?: React.CSSProperties;
}

declare type SizeType = "icon" | "label" | "full";

function isRow(row: Row | React.ReactNode): row is Row {
  return Boolean(row) && (row as Row).label !== undefined;
}

const marginLeft = 4;
const iconIndex = 0;
const labelIndex = 1;
const fullIndex = 2;

const Dividers: React.FC<DividerComponentProps> = ({
  rows,
  type = "horizontal",
  style = {},
  dividerStyle = {},
  dividerVisible = true,
  outerDividerStyle = {},
  outerDividerVisible = true,
  rowStyle = {},
}) => {
  const [size, divRef] = useSize<HTMLDivElement>();
  const widthRef = useRef<number[][]>([]);
  const [sizeType, setSizeType] = useState<Array<SizeType>>([]);

  function computeVertical(rows: Rows) {
    let iconPx = 0;
    let labelPx = 0;
    let fullPx = 0;

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

    return [iconPx, labelPx, fullPx];
  }

  function computeHorizontal(rows: Rows) {
    let iconPx = 0;
    let labelPx = 0;
    let fullPx = 0;

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
    iconPx = maxPx[iconIndex];
    labelPx = maxPx[labelIndex];
    fullPx = maxPx[fullIndex];

    return [iconPx, labelPx, fullPx];
  }

  useEffect(() => {
    const groups = rows[0] instanceof Array ? rows : [rows];

    if (!isRow(groups[0][0])) return;

    if (type == "vertical") {
      widthRef.current = groups.map((g: Rows) => computeVertical(g));
    } else {
      let iconSumPx = 0,
        labelSumPx = 0,
        fullSumPx = 0;

      const results = groups.map((g: Rows) => computeHorizontal(g));
      results.forEach((pxs) => {
        iconSumPx += pxs[iconIndex];
        labelSumPx += pxs[labelIndex];
        fullSumPx += pxs[fullIndex];
      });

      widthRef.current = results.map(() => [iconSumPx, labelSumPx, fullSumPx]);
    }
  }, []);

  function getSizeType(pxs: number[], size: number) {
    if (size > pxs[fullIndex]) {
      return "full";
    } else if (size > pxs[labelIndex] || pxs[iconIndex] === 0) {
      return "label";
    } else {
      return "icon";
    }
  }

  useMemo(() => {
    if (widthRef.current.length > 0) {
      setSizeType(widthRef.current.map((u) => getSizeType(u, size.width)));
    }
  }, [size.width]);

  const defaultDividerStyle: React.CSSProperties =
    type === "horizontal" ? { margin: "1px 0px" } : {};

  const defaultOuterDividerStyle: React.CSSProperties =
    type === "horizontal" ? { height: "auto" } : { margin: "2px 0px" };

  const defaultStyle: React.CSSProperties =
    type === "vertical" ? { display: "flex", justifyContent: "center", alignItems: "center" } : {};

  const switchedType: DividerProps["type"] = type === "horizontal" ? "vertical" : "horizontal";

  const _rowStyle: Radium.StyleProps["rules"] = {
    ":hover": {
      opacity: 0.7,
    },
    ...rowStyle,
  };

  function renderRow(row: React.ReactNode | Row, groupIndex: number) {
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

      if (sizeType[groupIndex] === "icon") {
        if (row.icon) {
          return <Tooltip title={row.label}>{node(sizeType[groupIndex])}</Tooltip>;
        } else {
          return node("label");
        }
      } else {
        return node(sizeType[groupIndex]);
      }
    } else {
      return row;
    }
  }

  function renderItem(rows: Array<React.ReactNode | Row>, groupIndex: number) {
    return rows
      .filter((row) => !!row && (Object.keys(row).indexOf("visible") === -1 || row["visible"]))
      .map((row, index) => {
        return (
          <>
            {index !== 0 && dividerVisible && (
              <Divider style={{ ...defaultDividerStyle, ...dividerStyle }} type={type} />
            )}
            <span style={_rowStyle} key={`${groupIndex}-node${index}`}>
              {renderRow(row, groupIndex)}
            </span>
          </>
        );
      });
  }

  return (
    <ConfigProvider {...getConfigProviderProps()}>
      <div
        ref={divRef}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: type === "horizontal" ? "row" : "column",
        }}
      >
        {(rows[0] instanceof Array ? rows : [rows]).map((u: Rows, i) => (
          <>
            {i !== 0 && outerDividerVisible && (
              <Divider
                style={{ ...defaultOuterDividerStyle, ...outerDividerStyle }}
                type={switchedType}
              />
            )}
            <div key={`row${i}`} style={{ ...defaultStyle, ...style }}>
              {renderItem(u, i)}
            </div>
          </>
        ))}
      </div>
    </ConfigProvider>
  );
};

export default Radium(Dividers);
