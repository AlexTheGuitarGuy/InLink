export const updateObjInArr = (arr, idLabel, replaceId, newData) => {
  return arr.map((e) => {
    if (e[idLabel] === replaceId) return { ...e, ...newData };
    return e;
  });
};

/*state.userMessages.map((e, i) => {
          if (i === action.userId)
            return e.map((m) => {
              if (m.id === action.messageId) m.text = action.data;
              return m;
            });
          return e;
        }),*/
