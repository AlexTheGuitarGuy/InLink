import { RootState } from '../redux-store';
import { NavItem } from '../../types/types';

export const getNavItems = (state: RootState) => {
  return state.navbar.navItems;
};
