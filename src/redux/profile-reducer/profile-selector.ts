import { RootState } from '../store'

export const getProfilePage = (state: RootState) => {
  return state.profilePage
}

export const getCurrentUserFollowed = (state: RootState) => {
  return state.profilePage.currentUserFollowed
}

export const getUserId = (state: RootState) => {
  return state.profilePage.userId
}

export const getCurrentUserData = (state: RootState) => {
  return getProfilePage(state).profileData
}

export const getPFP = (state: RootState) => {
  return getCurrentUserData(state)?.photos
}

export const getUserName = (state: RootState) => {
  return getCurrentUserData(state)?.fullName
}

export const getMyData = (state: RootState) => {
  return getProfilePage(state).myData
}

export const getIsLoading = (state: RootState) => {
  return getProfilePage(state).isLoading
}

export const getStoredText = (state: RootState) => {
  return getProfilePage(state).storedText
}

export const getPosts = (state: RootState) => {
  return getProfilePage(state).posts
}

export const getIsEditing = (state: RootState) => {
  return getProfilePage(state).isEditing
}

export const getStatus = (state: RootState) => {
  return getProfilePage(state).profileStatus
}
