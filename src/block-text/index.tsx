import "antd/lib/tag/style";

import Tag from "antd/lib/tag";
import React from "react";

export interface TagProps {
  text: string;
  color?: string;
}

export interface BlockTextComponentProps {
  major: React.ReactNode;
  minor?: React.ReactNode;
  tags?: TagProps[];
  majorStyle?: React.CSSProperties;
  minorStyle?: React.CSSProperties;
  tagStyle?: React.CSSProperties;
}

const BlockText: React.FC<BlockTextComponentProps> = ({
  tags = [],
  major,
  minor,
  majorStyle,
  minorStyle,
  tagStyle,
}) => {
  const _majorStyle = {
    ...majorStyle,
  };

  const _minorStyle = {
    fontSize: "smaller",
    display: "block",
    color: "darkgrey",
    ...minorStyle,
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {tags.map(({ text, color }) => (
        <Tag
          color={color}
          key={text}
          style={{
            whiteSpace: "unset",
            padding: "0 4px",
            marginRight: 4,
            maxWidth: 60,
            ...tagStyle,
          }}
        >
          {text}
        </Tag>
      ))}
      <div>
        <span style={_majorStyle}>{major}</span>
        {minor && <span style={_minorStyle}>{minor}</span>}
      </div>
    </div>
  );
};

export default BlockText;
