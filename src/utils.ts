export function computeCell(count: number) {
  if (count <= 1) return 24;
  if (count === 2) return 12;
  if (count === 3) return 8;
  return 6;
}

/**
 * flatten
 * @param array
 * @example const arr = [...flatten([1,2,[3,4,[5,6]]])]
 */
export function* flatten(array: any[]) {
  for (const item of array) {
    if (Array.isArray(item)) {
      yield* flatten(item);
    } else {
      yield item;
    }
  }
}

/**
 * get value by nested prop keys
 * @param obj object
 * @param props nested prop keys
 * @example
    getValueByNestedProps({a: {b: 'c'}}, ['a','b']) // return c
    getValueByNestedProps({1: [10,11,{a: 3},13]}, [1, 2, 'a']) // return 3
 */
export function getValueByNestedProps(obj: object, props: (string | number)[]) {
  let newObj: any = { ...obj };
  props.forEach((p) => {
    if (!newObj) return;
    newObj = newObj[p];
  });

  return newObj;
}

/**
 * set value by nested prop keys
 * @param obj object
 * @param props nested props keys
 * @param value value to set
 * @example
    setValueByNestedProps({}, ['a', 'b'], 'c') // {a: {b: 'c'}}
    setValueByNestedProps({}, [1, 2], 'c') // {1: [undefined, undefined, 'c']}
 */
export function setValueByNestedProps(obj: object, props: (string | number)[], value: any) {
  function setNest(o: object, level: number, v: any) {
    const prop = props[props.length - level];

    if (level > 1) {
      const nextProp = props[props.length - level + 1];
      if (typeof nextProp === "number" && !Array.isArray(o[prop])) {
        o[prop] = [];
      } else if (typeof o[prop] !== "object") {
        o[prop] = {};
      }

      setNest(o[prop], level - 1, v);
    } else {
      o[prop] = v;
    }
  }

  setNest(obj, props.length, value);
}
