import { RootState } from './redux-store';
import { ProfileReducerState } from './profile-reducer';
import { ProfileData, Post } from '../types/types';

export const getProfilePage = (state: RootState): ProfileReducerState => {
  return state.profilePage;
};

export const getCurrentUserData = (state: RootState): ProfileData | null => {
  return state.profilePage.profileData;
};

export const getMyData = (state: RootState): ProfileData | null => {
  return state.profilePage.myData;
};

export const getIsLoading = (state: RootState): boolean => {
  return state.profilePage.isLoading;
};

export const getStoredText = (state: RootState): string => {
  return state.profilePage.storedText;
};

export const getPosts = (state: RootState): Post[] => {
  return state.profilePage.posts;
};

export const getIsEditing = (state: RootState): boolean => {
  return state.profilePage.isEditing;
};

export const getStatus = (state: RootState): string => {
  return state.profilePage.profileStatus;
};
