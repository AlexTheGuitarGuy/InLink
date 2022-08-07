import { userAPI } from '../api/API';
import { updateObjInArr } from '../utils/object-helpers';

const TOGGLE_FOLLOW_STATUS = 'IN_LINK/USERS_PAGE_REDUCER/CHANGE_FOLLOW_STATUS';
const SET_USERS = 'IN_LINK/USERS_PAGE_REDUCER/SET_USERS';
const SET_PAGE = 'IN_LINK/USERS_PAGE_REDUCER/SET_PAGE';
const SET_USERS_NB = 'IN_LINK/USERS_PAGE_REDUCER/SET_USERS_NB';
const TOGGLE_LOADING = 'IN_LINK/USERS_PAGE_REDUCER/TOGGLE_LOADING';
const UPDATE_FOLLOW_QUEUE = 'IN_LINK/USERS_PAGE_REDUCER/UPDATE_FOLLOW_QUEUE';

const defaultState = {
  users: [
    /*
    {
      id: 1,
      name: ['Boy', 'Next-door'],
      bio: "Get up you lazy cow. Where's my breakfast?",
      location: { country: 'Belarus', city: 'Minsk' },
      isFollowing: true,
      pfp: (
        <img
          src={require('../../redux/photos/UsersPfp/u1.png')}
          alt="User1 pfp"
        />
      ),
    },
    {
      id: 2,
      name: ['Fucking', 'Slave'],
      bio: 'LIKE EMBARRASSING ME, HUH?',
      location: { country: 'Ukraine', city: 'Kivy' },
      isFollowing: false,
      pfp: (
        <img
          src={require('../../redux/photos/UsersPfp/u2.jpg')}
          alt="User2 pfp"
        />
      ),
    },
    {
      id: 3,
      name: ['Boss', 'Of This Gym'],
      bio: "Ok maggots i wanna see six hot loads on your di's hat, now",
      location: { country: 'Japan', city: 'Tokyo' },
      isFollowing: true,
      pfp: (
        <img
          src={require('../../redux/photos/UsersPfp/u3.jpg')}
          alt="User3 pfp"
        />
      ),
    },
    {
      id: 4,
      name: ['Dungeon', 'Master'],
      bio: "I'm an artist. I'm a performance artist.",
      location: { country: 'United states', city: 'Los Angeles' },
      isFollowing: false,
      pfp: (
        <img
          src={require('../../redux/photos/UsersPfp/u4.jpg')}
          alt="User4 pfp"
        />
      ),
    },
  */
  ],
  page: 1,
  totalUsers: 0,
  isLoading: false,
  followQueue: [],
};

const usersPageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_FOLLOW_STATUS:
      return {
        ...state,
        users: updateObjInArr(state.users, 'id', action.id, {
          ...action.payload,
        }),
      };
    case SET_USERS:
    case SET_PAGE:
    case SET_USERS_NB:
    case TOGGLE_LOADING:
      return {
        ...state,
        ...action.payload,
      };

    case UPDATE_FOLLOW_QUEUE:
      return {
        ...state,
        followQueue: state.followQueue.some((elem) => elem === action.id)
          ? state.followQueue.filter((value) => value !== action.id)
          : [...state.followQueue, action.id],
      };
    default:
      return state;
  }
};

export const toggleFollowStatus = (id, followed) => ({
  type: TOGGLE_FOLLOW_STATUS,
  id,
  payload: { followed },
});
export const setUsers = (users) => ({
  type: SET_USERS,
  payload: { users },
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: { page },
});

export const setUsersNb = (totalUsers) => ({
  type: SET_USERS_NB,
  payload: { totalUsers },
});

export const toggleLoading = (isLoading) => ({
  type: TOGGLE_LOADING,
  payload: { isLoading },
});

export const updateFollowQueue = (id) => ({
  type: UPDATE_FOLLOW_QUEUE,
  id,
});

export const requestUsers = (page, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));

    const data = await userAPI.getUsers(page, pageSize);

    dispatch(setUsers(data.items));
    dispatch(setUsersNb(data.totalCount));
    dispatch(toggleLoading(false));
  };
};

export const followUnfollowFlow = (id, request, followStatus) => {
  return async (dispatch) => {
    dispatch(updateFollowQueue(id));
    const data = await request(id);

    if (data.resultCode === 0) {
      dispatch(toggleFollowStatus(id, followStatus));
    }
    dispatch(updateFollowQueue(id));
  };
};

export const follow = (id) => {
  return async (dispatch) => {
    dispatch(followUnfollowFlow(id, userAPI.follow, true));
  };
};

export const unfollow = (id) => {
  return async (dispatch) => {
    dispatch(followUnfollowFlow(id, userAPI.unfollow, false));
  };
};

export default usersPageReducer;
