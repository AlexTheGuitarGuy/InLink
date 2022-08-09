type navItemType = {
  id: number;
  to: string;
  name: string;
};

type initialStateType = {
  navItems: navItemType[];
};

const initialState = {
  navItems: [
    { id: 1, to: '/profile', name: 'Profile' },
    { id: 2, to: '/messages', name: 'Messages' },
    { id: 3, to: '/users', name: 'Users' },
  ],
};

const navbarReducer = (state: initialStateType = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default navbarReducer;
