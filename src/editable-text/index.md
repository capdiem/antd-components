## Basic

表单类型支持文本输入框、数字输入框、选择器、树选择。

```tsx
import React, { useState } from "react";
import { EditableText } from "antd-components";
import { Radio, Tooltip } from "antd";
import "antd/dist/antd.css";
import { EditableTextComponentProps } from "@/editable-text";

const options = [
  { label: "Girl", value: "girl" },
  { label: "Boy", value: "boy" },
];

const treeData = [
  {
    title: "浙江",
    value: "010000",
    selectable: false,
    children: [
      {
        title: "杭州",
        value: "010100",
      },
      {
        title: "温州",
        value: "010200",
      },
    ],
  },
  {
    title: "江苏",
    value: "020000",
    selectable: false,
    children: [
      {
        title: "南京",
        value: "020100",
      },
      {
        title: "苏州",
        value: "020200",
      },
    ],
  },
];

export default () => {
  const [name, setName] = useState<string>("马冬梅");
  const [age, setAge] = useState<number>(34);
  const [gender, setGender] = useState<"girl" | "boy">("girl");
  const [city, setCity] = useState<sting>("010100");
  const [style, setStyle] = useState<EditableTextComponentProps["Style"]>("text");

  function onChange(e: RadioChangeEvent) {
    setStyle(e.target.value);
  }

  return (
    <>
      <div>
        展示风格：
        <Radio.Group onChange={onChange} value={style} style={{ marginBottom: 8 }}>
          <Radio.Button value="text">Text</Radio.Button>
          <Radio.Button value="link">Link</Radio.Button>
        </Radio.Group>
      </div>
      <div>
        姓名：
        <EditableText
          initialValue={name}
          style={style}
          type="input"
          onOk={(value) =>
            new Promise((resolve) => {
              setTimeout(() => {
                setName(value);
                resolve();
              }, 1000);
            })
          }
        >
          {name}
        </EditableText>
      </div>

      <div>
        年龄：
        <EditableText
          initialValue={age}
          style={style}
          type="inputNumber"
          props={{
            min: 0,
          }}
          onOk={(value) =>
            new Promise((resolve) => {
              setTimeout(() => {
                setAge(value);
                resolve();
              }, 1000);
            })
          }
        >
          {age}
        </EditableText>
      </div>

      <div>
        性别：
        <EditableText
          initialValue={gender}
          style={style}
          type="select"
          props={{
            options,
          }}
          onOk={(value) =>
            new Promise((resolve) => {
              setTimeout(() => {
                setGender(value);
                resolve();
              }, 1000);
            })
          }
        >
          {options.find((u) => u.value === gender)?.label}
        </EditableText>
      </div>

      <div>
        省市：
        <EditableText
          initialValue={city}
          style={style}
          type="treeSelect"
          props={{
            treeData,
            treeDefaultExpandAll: true,
          }}
          onOk={(value) =>
            new Promise((resolve) => {
              setTimeout(() => {
                setCity(value);
                resolve();
              }, 1000);
            })
          }
        >
          {
            (treeData.find((u) => u.value.startsWith(city.substring(0, 2)))?.children ?? []).find(
              (u) => u.value === city
            )?.title
          }
        </EditableText>
      </div>
    </>
  );
};
```

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
