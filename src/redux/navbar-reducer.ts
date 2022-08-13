import { NavItem } from '../types/types';

const initialState = {
  navItems: [
    { id: 1, to: '/profile', name: 'Profile' },
    { id: 2, to: '/messages', name: 'Messages' },
    { id: 3, to: '/users', name: 'Users' },
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
