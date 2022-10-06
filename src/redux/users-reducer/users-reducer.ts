import { userAPI } from '../../api/userAPI'
import { updateObjInArr } from '../../utils/object-helpers'
import { User } from '../../types/types'
import { ResultCodes } from '../../api/API'

import { InferAction, InferThunk } from '../redux-store'

const initialState = {
  users: [] as User[],
  followQueue: [] as number[],
  totalUsers: 0,
  currentPagesBeginning: 0,
  isLoading: false,
}

export type UsersPageReducerState = typeof initialState

type UsersAction = InferAction<typeof usersActions>

type UsersThunk = InferThunk<UsersAction>

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
      }
    case 'IN_LINK/USERS_PAGE_REDUCER/SET_USERS':
    case 'IN_LINK/USERS_PAGE_REDUCER/SET_USERS_NB':
    case 'IN_LINK/USERS_PAGE_REDUCER/SET_LOADING':
      return {
        ...state,
        ...action.payload,
      }
    case 'IN_LINK/USERS_PAGE_REDUCER/UPDATE_FOLLOW_QUEUE':
      return {
        ...state,
        followQueue: state.followQueue.some((elem) => elem === action.id)
          ? state.followQueue.filter((value) => value !== action.id)
          : [...state.followQueue, action.id],
      }
    default:
      return state
  }
}

export const usersActions = {
  setFollowStatus: (id: number, followed: boolean) =>
    ({
      type: 'IN_LINK/USERS_PAGE_REDUCER/SET_FOLLOW_STATUS',
      id,
      followed,
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
}

export type UsersRequest = {
  page: number
  count: number
  term?: string
  friend?: boolean
}

export const requestUsers = ({ page, count, term = '', friend }: UsersRequest): UsersThunk => {
  return async (dispatch) => {
    dispatch(usersActions.setLoading(true))

    let newURL = `users?page=${page}&count=${count}`
    if (term) newURL = `${newURL}&term=${term}`
    if (friend) newURL = `${newURL}&friend=${friend}`

    const data = await userAPI.getUsers(newURL)

    dispatch(usersActions.setUsers(data.items))
    dispatch(usersActions.setUsersNb(data.totalCount))
    dispatch(usersActions.setLoading(false))
  }
}

export const followUnfollowFlow = (
  id: number,
  request: typeof userAPI.follow | typeof userAPI.unfollow,
  followStatus: boolean,
): UsersThunk => {
  return async (dispatch) => {
    dispatch(usersActions.updateFollowQueue(id))
    const data = await request(id)

    if (data.resultCode === ResultCodes.Success) {
      dispatch(usersActions.setFollowStatus(id, followStatus))
    }
    dispatch(usersActions.updateFollowQueue(id))
  }
}

export const follow = (id: number): UsersThunk => {
  return async (dispatch) => {
    dispatch(followUnfollowFlow(id, userAPI.follow, true))
  }
}

export const unfollow = (id: number): UsersThunk => {
  return async (dispatch) => {
    dispatch(followUnfollowFlow(id, userAPI.unfollow, false))
  }
}

export default usersPageReducer
