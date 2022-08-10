import { userAPI } from '../api/API';
import { updateObjInArr } from '../utils/object-helpers';

const SET_FOLLOW_STATUS = 'IN_LINK/USERS_PAGE_REDUCER/SET_FOLLOW_STATUS';
const SET_USERS = 'IN_LINK/USERS_PAGE_REDUCER/SET_USERS';
const SET_PAGE = 'IN_LINK/USERS_PAGE_REDUCER/SET_PAGE';
const SET_USERS_NB = 'IN_LINK/USERS_PAGE_REDUCER/SET_USERS_NB';
const SET_LOADING = 'IN_LINK/USERS_PAGE_REDUCER/SET_LOADING';
const UPDATE_FOLLOW_QUEUE = 'IN_LINK/USERS_PAGE_REDUCER/UPDATE_FOLLOW_QUEUE';

const initialState = {
  users: null as UserType[] | null,
  page: 1,
  totalUsers: 0,
  isLoading: false,
  followQueue: [] as number[],
};

export type UsersPageReducerStateType = typeof initialState;

type ActionType =
  | SetFollowStatusActionType
  | SetUsersActionType
  | SetPageActionType
  | SetUsersNbActionType
  | SetLoadingActionType
  | UpdateFollowQueueActionType;

const usersPageReducer = (state = initialState, action: ActionType): UsersPageReducerStateType => {
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

type SetFollowStatusActionType = { type: typeof SET_FOLLOW_STATUS; id: number; followed: boolean };
export const setFollowStatus = (id: number, followed: boolean): SetFollowStatusActionType => ({
  type: SET_FOLLOW_STATUS,
  id,
  followed,
});

type UserType = {
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
type SetPageActionType = { type: typeof SET_PAGE; payload: { page: number } };
export const setPage = (page: number): SetPageActionType => ({
  type: SET_PAGE,
  payload: { page },
});

type SetUsersNbActionType = { type: typeof SET_USERS_NB; payload: { totalUsers: number } };
export const setUsersNb = (totalUsers: number): SetUsersNbActionType => ({
  type: SET_USERS_NB,
  payload: { totalUsers },
});

type SetUsersActionType = { type: typeof SET_USERS; payload: { users: UserType[] } };
export const setUsers = (users: UserType[]): SetUsersActionType => ({
  type: SET_USERS,
  payload: { users },
});

type SetLoadingActionType = { type: typeof SET_LOADING; payload: { isLoading: boolean } };
export const setLoading = (isLoading: boolean): SetLoadingActionType => ({
  type: SET_LOADING,
  payload: { isLoading },
});

type UpdateFollowQueueActionType = { type: typeof UPDATE_FOLLOW_QUEUE; id: number };
export const updateFollowQueue = (id: number): UpdateFollowQueueActionType => ({
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
