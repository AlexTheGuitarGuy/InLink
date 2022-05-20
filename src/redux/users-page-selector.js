export const getUsersPage = (state) => {
  return state.usersPage;
};

export const getPage = (state) => {
  return state.usersPage.page;
};

export const getPageSize = (state) => {
  return state.usersPage.pageSize;
};

export const getTotalUsers = (state) => {
  return state.usersPage.totalUsers;
};

export const getCurrentPagesBeginning = (state) => {
  return state.usersPage.currentPagesBeginning;
};

export const getIsLoading = (state) => {
  return state.usersPage.isLoading;
};

export const getFollowQueue = (state) => {
  return state.usersPage.followQueue;
};
