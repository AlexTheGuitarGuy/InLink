import { RootState } from '../redux-store';
import { User } from '../../types/types';

export const getUsers = (state: RootState) => {
  return state.usersPage.users;
};

export const getPortionSize = (state: RootState) => {
  return state.usersPage.portionSize;
};

export const getPage = (state: RootState) => {
  return state.usersPage.page;
};

export const getPageSize = (state: RootState) => {
  return state.usersPage.pageSize;
};

export const getTotalUsers = (state: RootState) => {
  return state.usersPage.totalUsers;
};

export const getCurrentPagesBeginning = (state: RootState) => {
  return state.usersPage.currentPagesBeginning;
};

export const getIsLoading = (state: RootState) => {
  return state.usersPage.isLoading;
};

export const getFollowQueue = (state: RootState) => {
  return state.usersPage.followQueue;
};
