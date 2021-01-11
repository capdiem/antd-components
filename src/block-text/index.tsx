import "antd/lib/tag/style";

import ConfigProvider from "antd/lib/config-provider";
import Tag from "antd/lib/tag";
import React from "react";

import { getConfigProviderProps } from "../";

export interface TagProps {
  text: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}

export interface BlockTextComponentProps {
  major: React.ReactNode;
  minor?: React.ReactNode;
  tags?: TagProps[];
  tagPosition?: "outer" | "minor";
  style?: React.CSSProperties;
  majorStyle?: React.CSSProperties;
  minorStyle?: React.CSSProperties;
}

const BlockText: React.FC<BlockTextComponentProps> = ({
  tags = [],
  tagPosition = "outer",
  major,
  minor,
  style,
  majorStyle,
  minorStyle,
}) => {
  const _majorStyle = {
    ...majorStyle,
  };

  const _minorStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "darkgrey",
    marginTop: "-2px",
    ...minorStyle,
  };

  const tagsNode = tags
    .filter((u) => u.text)
    .map(({ text, color, style }, key) => (
      <Tag
        color={color}
        key={key}
        style={
          tagPosition === "outer"
            ? {
                whiteSpace: "unset",
                padding: "0 4px",
                marginRight: 4,
                maxWidth: 60,
                ...style,
              }
            : {
                whiteSpace: "unset",
                padding: "0 4px",
                marginRight: 4,
                lineHeight: "16px",
                ...style,
              }
        }
      >
        {text}
      </Tag>
    ));

  return (
    <ConfigProvider {...getConfigProviderProps()}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          ...style,
        }}
      >
        <span>{tagPosition === "outer" && tagsNode}</span>
        <div>
          <div style={_majorStyle}>{major}</div>
          {minor && (
            <div style={_minorStyle}>
              <span>{tagPosition === "minor" && tagsNode}</span>
              <span>{minor}</span>
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default BlockText;
