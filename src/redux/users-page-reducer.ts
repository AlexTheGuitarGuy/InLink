import { userAPI } from '../api/API';
import { updateObjInArr } from '../utils/object-helpers';

const SET_FOLLOW_STATUS = 'IN_LINK/USERS_PAGE_REDUCER/SET_FOLLOW_STATUS';
const SET_USERS = 'IN_LINK/USERS_PAGE_REDUCER/SET_USERS';
const SET_PAGE = 'IN_LINK/USERS_PAGE_REDUCER/SET_PAGE';
const SET_USERS_NB = 'IN_LINK/USERS_PAGE_REDUCER/SET_USERS_NB';
const SET_LOADING = 'IN_LINK/USERS_PAGE_REDUCER/SET_LOADING';
const UPDATE_FOLLOW_QUEUE = 'IN_LINK/USERS_PAGE_REDUCER/UPDATE_FOLLOW_QUEUE';

type setFollowStatusActionType = { type: typeof SET_FOLLOW_STATUS; id: number; followed: boolean };

type user = {
  name: string;
  id: number;
  uniqueUrlName: null;
  photos: {
    small: string | null;
    large: string | null;
  };
  status: string | null;
  followed: boolean;
};
type setUsersActionType = { type: typeof SET_USERS; payload: user[] };

type setPageActionType = { type: typeof SET_PAGE; page: number };
type setUsersNbActionType = { type: typeof SET_USERS_NB; totalUsers: number };
type setLoadingActionType = { type: typeof SET_LOADING; isLoading: boolean };
type updateFollowQueue = { type: typeof UPDATE_FOLLOW_QUEUE; id: number };

type initialStateType = {
  users: user[] | null;
  page: number;
  totalUsers: number;
  isLoading: boolean;
  followQueue: number[];
};

const initialState = {
  users: null,
  page: 1,
  totalUsers: 0,
  isLoading: false,
  followQueue: [],
};

type actionType =
  | setFollowStatusActionType
  | setUsersActionType
  | setPageActionType
  | setUsersNbActionType
  | setLoadingActionType
  | updateFollowQueue;

const usersPageReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case SET_FOLLOW_STATUS:
      return {
        ...state,
        users: updateObjInArr(state.users, 'id', action.id, {
          followed: action.followed,
        }),
      };
    case SET_USERS:
      return {
        ...state,
        ...action.payload,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case SET_USERS_NB:
      return {
        ...state,
        totalUsers: action.totalUsers,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
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

export const setFollowStatus = (id: number, followed: boolean) => ({
  type: SET_FOLLOW_STATUS,
  id,
  followed,
});
export const setUsers = (users: user[]) => ({
  type: SET_USERS,
  payload: { users },
});

export const setPage = (page: number) => ({
  type: SET_PAGE,
  page,
});

export const setUsersNb = (totalUsers: number) => ({
  type: SET_USERS_NB,
  totalUsers,
});

export const setLoading = (isLoading: boolean) => ({
  type: SET_LOADING,
  isLoading,
});

export const updateFollowQueue = (id: number) => ({
  type: UPDATE_FOLLOW_QUEUE,
  id,
});

export const requestUsers = (page: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));

    const data = await userAPI.getUsers(page, pageSize);

    dispatch(setUsers(data.items));
    dispatch(setUsersNb(data.totalCount));
    dispatch(setLoading(false));
  };
};

export const followUnfollowFlow = (id: number, request: any, followStatus: boolean) => {
  return async (dispatch: any) => {
    dispatch(updateFollowQueue(id));
    const data = await request(id);

    if (data.resultCode === 0) {
      dispatch(setFollowStatus(id, followStatus));
    }
    dispatch(updateFollowQueue(id));
  };
};

export const follow = (id: number) => {
  return async (dispatch: any) => {
    dispatch(followUnfollowFlow(id, userAPI.follow, true));
  };
};

export const unfollow = (id: number) => {
  return async (dispatch: any) => {
    dispatch(followUnfollowFlow(id, userAPI.unfollow, false));
  };
};

export default usersPageReducer;
