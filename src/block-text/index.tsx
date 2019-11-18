import { Tag } from "antd";
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
}

const BlockText: React.FC<BlockTextComponentProps> = ({
  tags = [],
  major,
  minor,
  majorStyle,
  minorStyle,
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
        <Tag color={color} key={text}>
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
