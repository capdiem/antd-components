import "antd/es/tooltip/style";

import Tooltip from "antd/es/tooltip";
import React from "react";

export interface SubstringTextComponentProps {
  text: string;
  width: number;
  row?: number;
  separator?: string;
}

const SubstringText: React.FC<SubstringTextComponentProps> = ({
  text = "",
  width,
  row = 1,
  separator,
}) => {
  if (!width) {
    return <span>{text}</span>;
  }

  const limit = Number((Number(width) / 17).toFixed()) * row;

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
