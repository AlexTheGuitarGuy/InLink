const defaultState = {
  profileData: {
    id: 0,
    name: 'Me',
  },
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
