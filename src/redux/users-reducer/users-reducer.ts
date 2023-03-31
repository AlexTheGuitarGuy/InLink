import { ResultCodes } from '../../api/API'
import { userAPI } from '../../api/userAPI'
import { User } from '../../types/types'
import { updateObjInArr } from '../../utils/object-helpers'

import { InferAction, InferThunk } from '../store'

const initialState = {
  users: null as User[] | null,
  frontPageFriends: [] as User[],
  followQueue: [] as number[],
  totalUsers: 0,
  currentPagesBeginning: 0,
  isLoading: false,
  pageSize: 0,
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
    case 'IN_LINK/USERS_PAGE_REDUCER/SET_PAGE_SIZE':
    case 'IN_LINK/USERS_PAGE_REDUCER/SET_FRONT_PAGE_FRIENDS':
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

  setFrontPageFriends: (frontPageFriends: User[]) =>
    ({
      type: 'IN_LINK/USERS_PAGE_REDUCER/SET_FRONT_PAGE_FRIENDS',
      payload: { frontPageFriends },
    } as const),

  setLoading: (isLoading: boolean) =>
    ({
      type: 'IN_LINK/USERS_PAGE_REDUCER/SET_LOADING',
      payload: { isLoading },
    } as const),

  setPageSize: (pageSize: number) =>
    ({
      type: 'IN_LINK/USERS_PAGE_REDUCER/SET_PAGE_SIZE',
      payload: { pageSize },
    } as const),

  updateFollowQueue: (id: number) =>
    ({
      type: 'IN_LINK/USERS_PAGE_REDUCER/UPDATE_FOLLOW_QUEUE',
      id,
    } as const),
}

export const requestUsers = (params: string): UsersThunk => {
  return async (dispatch) => {
    dispatch(usersActions.setLoading(true))

    let newURL = `users${params}`

    const data = await userAPI.getUsers(newURL)

    dispatch(usersActions.setUsers(data.items))
    dispatch(usersActions.setUsersNb(data.totalCount))
    dispatch(usersActions.setLoading(false))
  }
}

export const fetchFrontPageFriends = (): UsersThunk => {
  return async (dispatch) => {
    const presentationUser1 = await userAPI.getUsers(
      `users?page=1&count=1&term=samurai+dimych&friend=true`,
    )
    const presentationUser2 = await userAPI.getUsers(
      `users?page=1&count=1&term=Natalie+Danilchenkofff&friend=true`,
    )

    const presentationUser3 = await userAPI.getUsers(
      `users?page=1&count=1&term=Дмитрий+Долидов&friend=true`,
    )

    let howManyFallbackFriends = 1
    if (!presentationUser1.items.length) howManyFallbackFriends++
    if (!presentationUser2.items.length) howManyFallbackFriends++
    if (!presentationUser3.items.length) howManyFallbackFriends++

    const fallbackFriends = await userAPI.getUsers(
      `users?page=1&count=${howManyFallbackFriends}&friend=true`,
    )

    const friendsArray = [
      ...presentationUser1.items,
      ...presentationUser2.items,
      ...presentationUser3.items,
      ...fallbackFriends.items,
    ]
    if (friendsArray.length === 4) dispatch(usersActions.setFrontPageFriends(friendsArray))
    else {
      const anyUsers = await userAPI.getUsers(`users?page=1&count=4`)
      dispatch(usersActions.setFrontPageFriends(anyUsers.items))
    }
  }
}

const _followUnfollowFlow = (
  id: number,
  request: typeof userAPI.follow | typeof userAPI.unfollow,
  followStatus: boolean,
): UsersThunk => {
  return async (dispatch) => {
    dispatch(usersActions.updateFollowQueue(id))
    const data = await request(id)

    if (data.resultCode === ResultCodes.Success) {
      dispatch(usersActions.setFollowStatus(id, followStatus))
    } else {
      throw new Error(data.messages[0])
    }
    dispatch(usersActions.updateFollowQueue(id))
  }
}

export const followInUsers = (id: number): UsersThunk => {
  return async (dispatch) => {
    dispatch(_followUnfollowFlow(id, userAPI.follow, true))
  }
}

export const unfollowInUsers = (id: number): UsersThunk => {
  return async (dispatch) => {
    dispatch(_followUnfollowFlow(id, userAPI.unfollow, false))
  }
}

export default usersPageReducer
