export function constructArray<T>(
  constructor: (index: number) => T,
  count: number
) {
  return new Array(count).fill("").map((_, index) => constructor(index));
}
