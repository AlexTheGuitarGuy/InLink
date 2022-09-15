import { RootState } from '../redux-store';
import { NavItem } from '../../types/types';

export const getNavItems = (state: RootState): NavItem[] => {
  return state.navbar.navItems;
};
