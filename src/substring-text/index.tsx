import "antd/es/tooltip/style";

import Tooltip from "antd/es/tooltip";
import React from "react";

export interface SubstringTextComponentProps {
  text: string | string[];
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
  width,
  az = "none",
  rows = 1,
  rowStyle,
}) => {
  if (!text || !width) {
    return <span>{text}</span>;
  }

  /**
   * 17:  每个中文所占的像素值
   * 1.7: 如果全部为英文字符（非中文字符）则再乘以1.7
   * 1.5: 如果中英文混合 则乘以1.5
   */
  const limit =
    Number((Number(width) / 17).toFixed()) * (az === "all" ? 1.7 : az === "mixed" ? 1.5 : 1) * rows;

  if (text instanceof Array) {
    if (text.length <= 5) {
      return text.some((u) => u.length > limit) ? (
        <Tooltip title={text}>
          {text.map((item) => (
            <div style={rowStyle}>
              {item.length > limit ? item.substring(0, limit - 1) + "..." : item}
            </div>
          ))}
        </Tooltip>
      ) : (
        <span>
          {text.map((u) => (
            <div style={rowStyle}>{u}</div>
          ))}
        </span>
      );
    }
    return (
      <Tooltip title={text}>
        <a>
          {text
            .filter((_, i) => i < 5)
            .map((item) => (
              <div style={rowStyle}>
                {item.length > limit ? item.substring(0, limit - 1) + "..." : item}
              </div>
            ))}
          <br />. . .
        </a>
      </Tooltip>
    );
  } else if ((text && text.length) > limit) {
    return (
      <Tooltip title={text}>
        <a>
          <span style={rowStyle}>{text.substring(0, limit - 1) + "..."}</span>
        </a>
      </Tooltip>
    );
  } else {
    return <span>{text}</span>;
  }
};

export default SubstringText;
