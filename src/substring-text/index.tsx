import "antd/lib/tooltip/style";

import Tooltip from "antd/lib/tooltip";
import React, { useEffect, useMemo, useRef, useState } from "react";
import stringWidth from "string-width";

import { EllipsisOutlined } from "@ant-design/icons";
import useSize from "@umijs/hooks/lib/useSize";

export interface SubstringTextComponentProps {
  text: string | string[];
  textStyle?: React.CSSProperties;
  type?: "link" | "dotted";
  /** 每条数据多少行开启截取，默认一行 */
  rowLineClamp?: number;
  /** 最多显示条数，默认三条 */
  maxRowCount?: number;
  rowStyle?: React.CSSProperties;
}

const SubstringText: React.FC<SubstringTextComponentProps> = ({
  text,
  textStyle = {},
  type = "dotted",
  rowLineClamp = 1,
  maxRowCount = 2,
  rowStyle,
}) => {
  const [size, divRef] = useSize<HTMLDivElement>();
  const rowStringWidthRef = useRef<{ content: string; px: number }[]>([]);
  const [rowEllipsis, setRowEllipsis] = useState<{ content: string; ellipsis: boolean }[]>([]);

  useEffect(() => {
    const initValue = text || [];

    if (initValue instanceof Array) {
      rowStringWidthRef.current = initValue
        .filter((u) => u)
        .map((u) => ({ content: u, px: stringWidth(u) * 7 }));
    } else {
      rowStringWidthRef.current = [{ content: initValue, px: stringWidth(initValue) * 7 }];
    }
  });

  useMemo(() => {
    setRowEllipsis(
      rowStringWidthRef.current.map((u) => ({
        content: u.content,
        ellipsis: u.px > size.width * rowLineClamp,
      }))
    );
  }, [size.width]);

  function getTitle(contents: string[]) {
    return contents.map((content, index) => (
      <div
        style={{ overflow: "auto", maxHeight: "50vh", fontSize: "smaller", ...textStyle }}
        key={index}
      >
        {content}
      </div>
    ));
  }

  const baseRowStyle: React.CSSProperties = {
    display: "-webkit-inline-box",
    WebkitLineClamp: rowLineClamp,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    margin: "-4px 0px",
    ...rowStyle,
  };

  const dottedStyle: React.CSSProperties = {
    borderBottomStyle: "dotted",
    borderBottomWidth: 1,
    cursor: "default",
  };

  const linkStyle: React.CSSProperties = {
    color: "#1890ff",
    textDecoration: "none",
    backgroundColor: "transparent",
    outline: "none",
    transition: "color 0.3s",
    cursor: "default",
  };

  return (
    <div ref={divRef}>
      {rowEllipsis.length > maxRowCount || rowEllipsis.some((u) => u.ellipsis) ? (
        <Tooltip title={getTitle(rowEllipsis.map((u) => u.content))}>
          {rowEllipsis
            .filter((_, index) => index < maxRowCount)
            .map((item, index) => (
              <div
                style={{ ...baseRowStyle, ...(type === "link" ? linkStyle : dottedStyle) }}
                key={index}
              >
                {item.content}
              </div>
            ))}
          {rowEllipsis.length > maxRowCount && (
            <div>
              <EllipsisOutlined style={type === "link" ? linkStyle : dottedStyle} />
            </div>
          )}
        </Tooltip>
      ) : (
        rowEllipsis.map((item, index) => (
          <div
            style={{
              ...baseRowStyle,
              ...(rowEllipsis.some((u) => u.ellipsis)
                ? type === "link"
                  ? linkStyle
                  : dottedStyle
                : {}),
            }}
            key={index}
          >
            {item.content}
          </div>
        ))
      )}
    </div>
  );
};

export default SubstringText;
