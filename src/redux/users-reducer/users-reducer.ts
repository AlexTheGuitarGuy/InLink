import { userAPI } from '../../api/API';
import { updateObjInArr } from '../../utils/object-helpers';
import { User, ResultCodes } from '../../types/types';
import { ThunkAction } from '@reduxjs/toolkit';
import { InferAction, RootState } from '../redux-store';

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

type UsersAction = InferAction<typeof usersActions>;

const usersPageReducer = (state = initialState, action: UsersAction): UsersPageReducerState => {
  switch (action.type) {
    case 'IN_LINK/USERS_PAGE_REDUCER/SET_FOLLOW_STATUS':
      return {
        ...state,
        users:
          state.users &&
          updateObjInArr(state.users, 'id', action.id, {
            followed: action.followed,
          }),
      };
    case 'IN_LINK/USERS_PAGE_REDUCER/SET_USERS':
    case 'IN_LINK/USERS_PAGE_REDUCER/SET_PAGE':
    case 'IN_LINK/USERS_PAGE_REDUCER/SET_USERS_NB':
    case 'IN_LINK/USERS_PAGE_REDUCER/SET_LOADING':
      return {
        ...state,
        ...action.payload,
      };
    case 'IN_LINK/USERS_PAGE_REDUCER/UPDATE_FOLLOW_QUEUE':
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

export const usersActions = {
  setFollowStatus: (id: number, followed: boolean) =>
    ({
      type: 'IN_LINK/USERS_PAGE_REDUCER/SET_FOLLOW_STATUS',
      id,
      followed,
    } as const),

  setPage: (page: number) =>
    ({
      type: 'IN_LINK/USERS_PAGE_REDUCER/SET_PAGE',
      payload: { page },
    } as const),

  setUsersNb: (totalUsers: number) =>
    ({
      type: 'IN_LINK/USERS_PAGE_REDUCER/SET_USERS_NB',
      payload: { totalUsers },
    } as const),

  setUsers: (users: User[]) =>
    ({
      type: 'IN_LINK/USERS_PAGE_REDUCER/SET_USERS',
      payload: { users },
    } as const),

  setLoading: (isLoading: boolean) =>
    ({
      type: 'IN_LINK/USERS_PAGE_REDUCER/SET_LOADING',
      payload: { isLoading },
    } as const),

  updateFollowQueue: (id: number) =>
    ({
      type: 'IN_LINK/USERS_PAGE_REDUCER/UPDATE_FOLLOW_QUEUE',
      id,
    } as const),
};

type UsersThunk = ThunkAction<Promise<void>, RootState, unknown, UsersAction>;

export const requestUsers = (page: number, pageSize: number): UsersThunk => {
  return async (dispatch) => {
    dispatch(usersActions.setLoading(true));

    const data = await userAPI.getUsers(page, pageSize);

    dispatch(usersActions.setUsers(data.items));
    dispatch(usersActions.setUsersNb(data.totalCount));
    dispatch(usersActions.setLoading(false));
  };
};

export const followUnfollowFlow = (
  id: number,
  request: typeof userAPI.follow | typeof userAPI.unfollow,
  followStatus: boolean,
): UsersThunk => {
  return async (dispatch) => {
    dispatch(usersActions.updateFollowQueue(id));
    const data = await request(id);

    if (data.resultCode === ResultCodes.Success) {
      dispatch(usersActions.setFollowStatus(id, followStatus));
    }
    dispatch(usersActions.updateFollowQueue(id));
  };
};

export const follow = (id: number): UsersThunk => {
  return async (dispatch) => {
    dispatch(followUnfollowFlow(id, userAPI.follow, true));
  };
};

export const unfollow = (id: number): UsersThunk => {
  return async (dispatch) => {
    dispatch(followUnfollowFlow(id, userAPI.unfollow, false));
  };
};

export default usersPageReducer;
