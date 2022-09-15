import { RootState } from '../redux-store';
import { User } from '../../types/types';

export const getUsers = (state: RootState): User[] | null => {
  return state.usersPage.users;
};

export const getPortionSize = (state: RootState): number => {
  return state.usersPage.portionSize;
};

export const getPage = (state: RootState): number => {
  return state.usersPage.page;
};

export const getPageSize = (state: RootState): number => {
  return state.usersPage.pageSize;
};

export const getTotalUsers = (state: RootState): number => {
  return state.usersPage.totalUsers;
};

export const getCurrentPagesBeginning = (state: RootState): number => {
  return state.usersPage.currentPagesBeginning;
};

export const getIsLoading = (state: RootState): boolean => {
  return state.usersPage.isLoading;
};

export const getFollowQueue = (state: RootState): number[] => {
  return state.usersPage.followQueue;
};
