import { RootState } from '../redux-store'

export const getNavItems = (state: RootState) => {
  return state.navbar.navItems
}
