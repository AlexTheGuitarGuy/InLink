const defaultState = {
  navItems: [
    { id: 1, to: '/', name: 'Home' },
    { id: 2, to: '/profile', name: 'Profile' },
    { id: 3, to: '/messages', name: 'Messages' },
    { id: 4, to: '/users', name: 'Users' },
  ],
};

const sidebarReducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default sidebarReducer;
