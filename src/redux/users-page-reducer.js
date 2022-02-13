const CHANGE_FOLLOW_STATUS = 'CHANGE-FOLLOW-STATUS';
const SET_USERS = 'SET-USERS';

let defaultState = {
  users: [],
};

const usersPageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_FOLLOW_STATUS:
      return {
        ...state,
        users: state.users.map((e) => {
          if (e.id === action.id) e.isFollowing = !e.isFollowing;
          return e;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    default:
      return state;
  }
};

export const changeFollowStatusAC = (id) => ({type: CHANGE_FOLLOW_STATUS, id});
export const setUsersAC = (users) => ({type: SET_USERS, users});

export default usersPageReducer;
