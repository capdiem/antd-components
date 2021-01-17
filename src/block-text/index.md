---
toc: false
group:
  title: BlockText
---

## 基本使用

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
