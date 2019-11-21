import "antd/es/tooltip/style";

import Tooltip from "antd/es/tooltip";
import React from "react";

export interface SubstringTextComponentProps {
  text: string;
  /**
   * 每行最大长度
   */
  width: number;
  /**
   * 是否全为英文字符
   */
  az?: boolean;
  /**
   * 显示行数
   */
  row?: number;
  /**
   * 分隔字符
   */
  separator?: string;
}

const SubstringText: React.FC<SubstringTextComponentProps> = ({
  text = "",
  width,
  az = false,
  row = 1,
  separator,
}) => {
  if (!width) {
    return <span>{text}</span>;
  }

  /**
   * 17:  每个中文所占的像素值
   * 1.7: 如果全部为英文字符（非中文字符）则再乘以1.7
   */
  const limit = Number((Number(width) / 17).toFixed()) * (az ? 1.7 : 1) * row;

  if (separator && text.includes(separator)) {
    const arr = text.split(separator);
    text = arr.join("\n");
    if (arr.length <= 5) {
      return arr.some((u) => u.length > limit) ? (
        <Tooltip title={text}>
          {arr
            .map((item) => (item.length > limit ? item.substring(0, limit - 1) + "..." : item))
            .join("\n")}
        </Tooltip>
      ) : (
        <span>{arr.join("\n")}</span>
      );
    }
    return (
      <Tooltip title={text}>
        <a>
          {arr
            .filter((_, i) => i < 5)
            .map((item) => (item.length > limit ? item.substring(0, limit - 1) + "..." : item))
            .join("\n")}
          <br />. . .
        </a>
      </Tooltip>
    );
  } else if ((text && text.length) > limit) {
    return (
      <Tooltip title={text}>
        <a>{text.substring(0, limit - 1) + "..."}</a>
      </Tooltip>
    );
  } else {
    return <span>{text}</span>;
  }
};

export default SubstringText;
