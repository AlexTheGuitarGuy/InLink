import { NavItem } from '../types/types';

const initialState = {
  navItems: [
    { to: '/profile', name: 'Profile' },
    { to: '/messages', name: 'Messages' },
    { to: '/users', name: 'Users' },
  ] as NavItem[],
};

export type NavbarReducerState = typeof initialState;

const navbarReducer = (state = initialState, action: any): NavbarReducerState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default navbarReducer;
