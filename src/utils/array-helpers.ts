export const swapElements = (
  array: any[],
  firstElementIndex: number,
  secondElementIndex: number,
) => {
  ;[array[firstElementIndex], array[secondElementIndex]] = [
    array[secondElementIndex],
    array[firstElementIndex],
  ]
}
