export function updateObjInArr<T, P>(arr: T[], idLabel: keyof T, replaceId: number, newData: P) {
  return arr.map((element) => {
    if (+element[idLabel] === replaceId) return { ...element, ...newData };
    return element;
  });
}
