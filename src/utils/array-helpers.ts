export const swapElements = (
  array: unknown[],
  firstElementIndex: number,
  secondElementIndex: number,
) => {
  ;[array[firstElementIndex], array[secondElementIndex]] = [
    array[secondElementIndex],
    array[firstElementIndex],
  ]
}
