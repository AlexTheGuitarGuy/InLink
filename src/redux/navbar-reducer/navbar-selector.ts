import { RootState } from '../store'

export const getNavItems = (state: RootState) => {
  return state.navbar.navItems
}
