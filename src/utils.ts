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
