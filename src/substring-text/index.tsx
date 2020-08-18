import "antd/lib/tooltip/style";

import ConfigProvider from "antd/lib/config-provider";
import Tooltip from "antd/lib/tooltip";
import React, { useEffect, useState } from "react";
import stringWidth from "string-width";

import { EllipsisOutlined } from "@ant-design/icons";
import useSize from "@umijs/hooks/lib/useSize";

import { getConfigProviderProps } from "../";

export interface SubstringTextComponentProps {
  text: string | string[];
  textStyle?: React.CSSProperties;
  type?: "link" | "dotted" | "plain";
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
  maxRowCount = 3,
  rowStyle,
}) => {
  const [size, divRef] = useSize<HTMLDivElement>();
  const [rowEllipsis, setRowEllipsis] = useState<{ content: string; ellipsis: boolean }[]>([]);

  useEffect(() => {
    const initValue = text || [];
    let rowStringWidths = [];

    if (initValue instanceof Array) {
      rowStringWidths = initValue
        .filter((u) => u)
        .map((u) => ({ content: u, px: stringWidth(u) * 7 }));
    } else {
      rowStringWidths = [{ content: initValue, px: stringWidth(initValue) * 7 }];
    }

    setRowEllipsis(
      rowStringWidths.map((u) => ({
        content: u.content,
        ellipsis: u.px > size.width * rowLineClamp,
      }))
    );
  }, [text, size.width, rowLineClamp]);

  function getTitle(contents: string[]) {
    return (
      <div style={{ maxHeight: "50vh", overflow: "auto" }}>
        {contents.map((content, index) => (
          <div
            style={{ overflow: "auto", maxHeight: "50vh", fontSize: "smaller", ...textStyle }}
            key={index}
          >
            {content}
          </div>
        ))}
      </div>
    );
  }

  const baseRowStyle: React.CSSProperties = {
    display: "-webkit-inline-box",
    WebkitLineClamp: rowLineClamp,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    margin: "-4px 0px",
    overflowWrap: "anywhere",
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

  const greaterThanMaxRowCount = rowEllipsis.length > maxRowCount;

  const borderStyle = type === "plain" ? {} : type === "link" ? linkStyle : dottedStyle;

  return (
    <ConfigProvider {...getConfigProviderProps()}>
      <div ref={divRef}>
        {greaterThanMaxRowCount || rowEllipsis.some((u) => u.ellipsis) ? (
          <Tooltip title={getTitle(rowEllipsis.map((u) => u.content))}>
            <div>
              {rowEllipsis
                .filter((_, index) =>
                  greaterThanMaxRowCount ? index < maxRowCount - 1 : index < maxRowCount
                ) // -1 because the last line is ellipsis
                .map((item, index) => (
                  <div key={index} style={rowStyle}>
                    <p style={{ ...baseRowStyle, ...borderStyle }}>{item.content}</p>
                  </div>
                ))}
              {greaterThanMaxRowCount && (
                <div style={rowStyle}>
                  <EllipsisOutlined style={borderStyle} />
                </div>
              )}
            </div>
          </Tooltip>
        ) : (
          rowEllipsis.map((item, index) => (
            <div key={index} style={rowStyle}>
              <p
                style={{
                  ...baseRowStyle,
                  ...(rowEllipsis.some((u) => u.ellipsis) ? borderStyle : {}),
                }}
                key={index}
              >
                {item.content}
              </p>
            </div>
          ))
        )}
      </div>
    </ConfigProvider>
  );
};

export default SubstringText;
