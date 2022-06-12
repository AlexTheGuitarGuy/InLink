export const updateObjInArr = (arr, idLabel, replaceId, newData) => {
  return arr.map((e) => {
    if (e[idLabel] === replaceId) return { ...e, ...newData };
    return e;
  });
};
