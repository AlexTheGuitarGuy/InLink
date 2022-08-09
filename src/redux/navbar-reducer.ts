type NavItemType = {
  id: number;
  to: string;
  name: string;
};
const initialState = {
  navItems: [
    { id: 1, to: '/profile', name: 'Profile' },
    { id: 2, to: '/messages', name: 'Messages' },
    { id: 3, to: '/users', name: 'Users' },
  ] as NavItemType[],
};

type InitialStateType = typeof initialState;

const navbarReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    default:
      return state;
  }
};

export default navbarReducer;
