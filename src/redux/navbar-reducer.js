const defaultState = {
  navItems: [
    { id: 1, to: '/profile', name: 'Profile' },
    { id: 2, to: '/messages', name: 'Messages' },
    { id: 3, to: '/users', name: 'Users' },
  ],
};

const navbarReducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default navbarReducer;
