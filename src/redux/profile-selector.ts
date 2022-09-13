import { RootState } from './redux-store';
import { ProfileReducerState } from './profile-reducer';
import { Photo, ProfileData, Post } from '../types/types';

export const getProfilePage = (state: RootState): ProfileReducerState => {
  return state.profilePage;
};

export const getCurrentUserData = (state: RootState): ProfileData | null => {
  return getProfilePage(state).profileData;
};

export const getPFP = (state: RootState): Photo | undefined => {
  return getCurrentUserData(state)?.photos;
};

export const getUserName = (state: RootState): string | undefined => {
  return getCurrentUserData(state)?.fullName;
};

export const getMyData = (state: RootState): ProfileData | null => {
  return getProfilePage(state).myData;
};

export const getIsLoading = (state: RootState): boolean => {
  return getProfilePage(state).isLoading;
};

export const getStoredText = (state: RootState): string => {
  return getProfilePage(state).storedText;
};

export const getPosts = (state: RootState): Post[] => {
  return getProfilePage(state).posts;
};

export const getIsEditing = (state: RootState): boolean => {
  return getProfilePage(state).isEditing;
};

export const getStatus = (state: RootState): string => {
  return getProfilePage(state).profileStatus;
};
