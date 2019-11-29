import "antd/es/tooltip/style";

import Tooltip from "antd/es/tooltip";
import React from "react";

export interface SubstringTextComponentProps {
  text: string | string[];
  textStyle?: React.CSSProperties;
  type?: "link" | "dotted";
  /**
   * 每行最大长度
   */
  width: number;
  /**
   * 是否全为英文字符
   */
  az?: "all" | "mixed" | "none";
  /**
   * 显示行数
   */
  rows?: number;
  rowStyle?: React.CSSProperties;
}

const SubstringText: React.FC<SubstringTextComponentProps> = ({
  text,
  textStyle = {},
  type = "dotted",
  width,
  az = "none",
  rows = 1,
  rowStyle,
}) => {
  if (!text || !width) {
    return <span>{text}</span>;
  }

  // TODO: 只能提示

  /**
   * fontSize default set 14px
   * 14:  每个中文所占的像素值
   * 1.7: 如果全部为英文字符（非中文字符）则再乘以1.7
   * 1.3: 如果中英文混合 则乘以1.3
   */
  const limit =
    Number(((Number(width) / 14) * (az === "all" ? 1.7 : az === "mixed" ? 1.3 : 1)).toFixed()) *
    rows;

  function getTitle(content: string) {
    return (
      <div style={{ overflow: "auto", maxHeight: "50vh", fontSize: "smaller", ...textStyle }}>
        {content}
      </div>
    );
  }

  const dottedStyle: React.CSSProperties = {
    borderBottomStyle: "dotted",
    borderBottomWidth: 1,
    cursor: "default",
  };

  if (text instanceof Array) {
    if (text.length <= 5) {
      return text.some((u) => u.length > limit) ? (
        <Tooltip title={getTitle(text.join("\n"))}>
          {text.map((item, index) => {
            const sub = item.length > limit ? item.substring(0, limit - 1) + "..." : item;

            return (
              <div key={index} style={rowStyle}>
                {type === "link" ? <a>{sub}</a> : <span style={dottedStyle}>{sub}</span>}
              </div>
            );
          })}
        </Tooltip>
      ) : (
        <span>
          {text.map((u, i) => (
            <div key={i} style={rowStyle}>
              {u}
            </div>
          ))}
        </span>
      );
    }

    return (
      <Tooltip title={getTitle(text.join("\n"))}>
        {text
          .filter((_, i) => i < 5)
          .map((item, index) => {
            const sub = item.length > limit ? item.substring(0, limit - 1) + "..." : item;

            return (
              <div key={index} style={rowStyle}>
                {type === "link" ? <a>{sub}</a> : <span style={dottedStyle}>{sub}</span>}
              </div>
            );
          })}
        . . .
      </Tooltip>
    );
  } else if ((text && text.length) > limit) {
    const sub = text.substring(0, limit - 1) + "...";
    return (
      <Tooltip title={getTitle(text)}>
        <div style={rowStyle}>
          {type === "link" ? <a>{sub}</a> : <span style={dottedStyle}>{sub}</span>}
        </div>
      </Tooltip>
    );
  } else {
    return <span>{text}</span>;
  }
};

export default SubstringText;
