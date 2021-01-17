## Basic

区分主要信息和次要信息。例如品牌：

```tsx
import React from "react";
import { BlockText } from "antd-components";

export default () => (
  <>
    <BlockText major="华为" minor="Huawei" />
    <BlockText
      major="马云(加粗)"
      minor="阿里巴巴老板(变蓝)"
      majorStyle={{ fontWeight: "bold" }}
      minorStyle={{ color: "lightblue" }}
    />
  </>
);
```

## Tags

增加标签显示：

```tsx
import React, { useState } from "react";
import { BlockText } from "antd-components";
import { Radio, Tooltip } from "antd";
import "antd/dist/antd.css";
import { BlockTextComponentProps } from "@/block-text";

export default () => {
  const [position, setPosition] = useState<BlockTextComponentProps["tagPosition"]>("outer");

  function onChange(e: RadioChangeEvent) {
    setPosition(e.target.value);
  }

  return (
    <>
      <div>
        标签位置：
        <Radio.Group onChange={onChange} value={position} style={{ marginBottom: 8 }}>
          <Radio.Button value="outer">outer</Radio.Button>
          <Radio.Button value="minor">minor</Radio.Button>
        </Radio.Group>
      </div>
      <BlockText
        major="ORDER_ID_20201118092334982"
        minor="2020-11-18 09:23:34"
        tagPosition={position}
        tagStyle={{}}
        tags={[
          { text: "在线支付", color: "blue", style: position === "outer" ? { width: 34 } : {} },
          { text: "浙江", style: position === "outer" ? { width: 22 } : {} },
        ]}
      />
    </>
  );
};
```
