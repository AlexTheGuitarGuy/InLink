import { RootState } from '@/redux/store'

export const getUsers = (state: RootState) => {
  return state.usersPage.users
}

export const getFrontPageFriends = (state: RootState) => {
  return state.usersPage.frontPageFriends
}

export const getTotalUsers = (state: RootState) => {
  return state.usersPage.totalUsers
}

export const getPageSize = (state: RootState) => {
  return state.usersPage.pageSize
}

export const getCurrentPagesBeginning = (state: RootState) => {
  return state.usersPage.currentPagesBeginning
}

export const getIsLoading = (state: RootState) => {
  return state.usersPage.isLoading
}

export const getFollowQueue = (state: RootState) => {
  return state.usersPage.followQueue
}
