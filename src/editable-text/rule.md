---
toc: false
---

## 规则验证

```tsx
import React, { useState } from "react";
import { EditableText } from "antd-components";

export default () => {
  const [email, setEmail] = useState<string>("capdiem@hi.com");

  return (
    <div>
      邮箱：
      <EditableText
        initialValue={email}
        type="input"
        rule="email"
        onOk={(value) =>
          new Promise((resolve) => {
            setTimeout(() => {
              setEmail(value);
              resolve();
            }, 1000);
          })
        }
      >
        {email}
      </EditableText>
    </div>
  );
};
```
