## Basic

```tsx
import React, { useState } from "react";
import { EditableText } from "antd-components";

export default () => {
  const [initialValue, setInitialValue] = useState<string>("马冬梅");

  return (
    <>
      姓名：
      <EditableText
        rootStyle={{ display: "inline-block", fontSize: "small" }}
        initialValue={initialValue}
        style="text"
        type="input"
        size="small"
        onOk={(value) =>
          new Promise((resolve) => {
            setTimeout(() => {
              setInitialValue(value);
              resolve();
            }, 1000);
          })
        }
      >
        {initialValue}
      </EditableText>
    </>
  );
};
```
