import { userAPI } from '../api/API';
import { updateObjInArr } from '../utils/object-helpers';
import { User } from '../types/types';

const SET_FOLLOW_STATUS = 'IN_LINK/USERS_PAGE_REDUCER/SET_FOLLOW_STATUS';
const SET_USERS = 'IN_LINK/USERS_PAGE_REDUCER/SET_USERS';
const SET_PAGE = 'IN_LINK/USERS_PAGE_REDUCER/SET_PAGE';
const SET_USERS_NB = 'IN_LINK/USERS_PAGE_REDUCER/SET_USERS_NB';
const SET_LOADING = 'IN_LINK/USERS_PAGE_REDUCER/SET_LOADING';
const UPDATE_FOLLOW_QUEUE = 'IN_LINK/USERS_PAGE_REDUCER/UPDATE_FOLLOW_QUEUE';

const initialState = {
  users: [] as User[],
  page: 1,
  totalUsers: 0,
  isLoading: false,
  followQueue: [] as number[],
  portionSize: 0,
  pageSize: 0,
  currentPagesBeginning: 0,
};

export type UsersPageReducerState = typeof initialState;

type Action =
  | SetFollowStatusAction
  | SetUsersAction
  | SetPageAction
  | SetUsersNbAction
  | SetLoadingAction
  | UpdateFollowQueueAction;

const usersPageReducer = (state = initialState, action: Action): UsersPageReducerState => {
  switch (action.type) {
    case SET_FOLLOW_STATUS:
      return {
        ...state,
        users:
          state.users &&
          updateObjInArr(state.users, 'id', action.id, {
            followed: action.followed,
          }),
      };
    case SET_USERS:
    case SET_PAGE:
    case SET_USERS_NB:
    case SET_LOADING:
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

type SetFollowStatusAction = { type: typeof SET_FOLLOW_STATUS; id: number; followed: boolean };
export const setFollowStatus = (id: number, followed: boolean): SetFollowStatusAction => ({
  type: SET_FOLLOW_STATUS,
  id,
  followed,
});

type SetPageAction = { type: typeof SET_PAGE; payload: { page: number } };
export const setPage = (page: number): SetPageAction => ({
  type: SET_PAGE,
  payload: { page },
});

type SetUsersNbAction = { type: typeof SET_USERS_NB; payload: { totalUsers: number } };
export const setUsersNb = (totalUsers: number): SetUsersNbAction => ({
  type: SET_USERS_NB,
  payload: { totalUsers },
});

type SetUsersAction = { type: typeof SET_USERS; payload: { users: User[] } };
export const setUsers = (users: User[]): SetUsersAction => ({
  type: SET_USERS,
  payload: { users },
});

type SetLoadingAction = { type: typeof SET_LOADING; payload: { isLoading: boolean } };
export const setLoading = (isLoading: boolean): SetLoadingAction => ({
  type: SET_LOADING,
  payload: { isLoading },
});

type UpdateFollowQueueAction = { type: typeof UPDATE_FOLLOW_QUEUE; id: number };
export const updateFollowQueue = (id: number): UpdateFollowQueueAction => ({
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
