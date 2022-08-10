export const updateObjInArr = (arr: any[], idLabel: string, replaceId: number, newData: Object) => {
  return arr.map((e) => {
    if (e[idLabel] === replaceId) return { ...e, ...newData };
    return e;
  });
};
