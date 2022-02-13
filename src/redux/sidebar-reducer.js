const defaultState = {
  navItems: [
    { id: 1, to: '/', name: 'Home' },
    { id: 2, to: '/profile', name: 'Profile' },
    { id: 3, to: '/messages', name: 'Messages' },
    { id: 4, to: '/users', name: 'Users' },
    { id: 5, to: '/news', name: 'News' },
    { id: 6, to: '/music', name: 'Music' },
    { id: 7, to: '/preferences', name: 'Preferences' },
  ],
};

const sidebarReducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default sidebarReducer;
