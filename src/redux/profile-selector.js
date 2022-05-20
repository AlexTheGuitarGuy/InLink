export const getProfilePage = (state) => {
  return state.profilePage;
};

export const getIsLoading = (state) => {
  return state.profilePage.isLoading;
};

export const getCanEdit = (state) => {
  return state.profilePage.canEdit;
};

export const getStoredText = (state) => {
  return state.profilePage.storedText;
};

export const getPosts = (state) => {
  return state.profilePage.posts;
};
