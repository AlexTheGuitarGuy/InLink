import { v1 as uuidv1 } from 'uuid'

import { GetProfileResponse, ResultCodes } from '@/api/API'
import { profileAPI } from '@/api/profileAPI'
import { userAPI } from '@/api/userAPI'
import { FormikStatus, InputProfileData, Photo, Post } from '@/types'
import { updateObjInArr } from '@/utils/object-helpers'
import { setAlertFromThunk } from '@/redux/app-reducer/app-reducer'
import { InferAction, InferThunk } from '@/redux/store'

const initialState = {
  posts: [
    {
      id: uuidv1(),
      text: 'Hello world',
      likes: 333,
      likedByUser: false,
    },
    { id: uuidv1(), text: 'I am a coder in react!', likes: 222, likedByUser: true },
    {
      id: uuidv1(),
      text: 'I code everyday',
      likes: 111,
      likedByUser: false,
    },
  ] as Post[],
  profileData: null as GetProfileResponse | null,
  myData: null as GetProfileResponse | null,
  profileStatus: '',
  storedText: '',
  isLoading: false,
  isUploadingPfp: false,
  currentUserFollowed: false,
  isFollowingInProgress: false,
}

export type ProfileReducerState = typeof initialState

type ProfileAction = InferAction<typeof profileActions>

type ProfileThunk = InferThunk<ProfileAction, void | { success: boolean }>

const profileReducer = (state = initialState, action: ProfileAction): ProfileReducerState => {
  switch (action.type) {
    case 'IN_LINK/PROFILE_REDUCER/POST': {
      if (action.payload) {
        return {
          ...state,
          posts: [
            ...state.posts,
            {
              id: uuidv1(),
              text: action.payload,
              likedByUser: false,
              likes: 0,
            },
          ],
        }
      }

      return {
        ...state,
        storedText: '',
      }
    }

    case 'IN_LINK/PROFILE_REDUCER/TRIGGER_LIKE': {
      const newPosts = [...state.posts]

      const likedPost = { ...newPosts.find((post) => post.id === action.postId) } as Post

      if (!likedPost) return { ...state }

      if (!likedPost.likedByUser) {
        likedPost.likes++
        likedPost.likedByUser = true
      } else {
        likedPost.likes--
        likedPost.likedByUser = false
      }

      return {
        ...state,
        posts: newPosts.map((post) => (post.id === action.postId ? likedPost : post)),
      }
    }

    case 'IN_LINK/PROFILE_REDUCER/SET_IS_FOLLOWING_IN_PROGRESS':
    case 'IN_LINK/PROFILE_REDUCER/SET_PROFILE':
    case 'IN_LINK/PROFILE_REDUCER/SET_MY_PROFILE':
    case 'IN_LINK/PROFILE_REDUCER/SET_STATUS':
    case 'IN_LINK/PROFILE_REDUCER/SET_LOADING':
    case 'IN_LINK/PROFILE_REDUCER/SET_CURRENT_USER_FOLLOWED':
    case 'IN_LINK/PROFILE_REDUCER/SET_IS_UPLOADING_PFP':
      return {
        ...state,
        ...action.payload,
      }

    case 'IN_LINK/PROFILE_REDUCER/UPLOAD_PHOTO_SUCCESS':
      return {
        ...state,
        myData: { ...state.myData, photos: { ...action.file } } as GetProfileResponse,
        profileData: { ...state.profileData, photos: { ...action.file } } as GetProfileResponse,
      }

    case 'IN_LINK/PROFILE_REDUCER/DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.id),
      }

    case 'IN_LINK/PROFILE_REDUCER/EDIT_POST':
      return {
        ...state,
        posts: updateObjInArr<Post, { text: string }>(state.posts, 'id', action.id, {
          text: action.payload,
        }),
      }

    default:
      return state
  }
}

export const profileActions = {
  createPost: (payload: string) => ({ type: 'IN_LINK/PROFILE_REDUCER/POST', payload } as const),

  deletePost: (id: string) => ({ type: 'IN_LINK/PROFILE_REDUCER/DELETE_POST', id } as const),

  editPost: (id: string, payload: string) =>
    ({
      type: 'IN_LINK/PROFILE_REDUCER/EDIT_POST',
      id,
      payload,
    } as const),

  setProfile: (profileData: GetProfileResponse) =>
    ({
      type: 'IN_LINK/PROFILE_REDUCER/SET_PROFILE',
      payload: { profileData },
    } as const),

  setMyProfile: (myData: GetProfileResponse) =>
    ({
      type: 'IN_LINK/PROFILE_REDUCER/SET_MY_PROFILE',
      payload: { myData },
    } as const),

  setStatus: (profileStatus: string) =>
    ({
      type: 'IN_LINK/PROFILE_REDUCER/SET_STATUS',
      payload: { profileStatus },
    } as const),

  setLoading: (isLoading: boolean) =>
    ({
      type: 'IN_LINK/PROFILE_REDUCER/SET_LOADING',
      payload: { isLoading },
    } as const),

  uploadSuccess: (file: Photo) =>
    ({
      type: 'IN_LINK/PROFILE_REDUCER/UPLOAD_PHOTO_SUCCESS',
      file,
    } as const),
  triggerLike: (postId: string) =>
    ({
      type: 'IN_LINK/PROFILE_REDUCER/TRIGGER_LIKE',
      postId,
    } as const),
  setCurrentUserFollowed: (currentUserFollowed: boolean) =>
    ({
      type: 'IN_LINK/PROFILE_REDUCER/SET_CURRENT_USER_FOLLOWED',
      payload: { currentUserFollowed },
    } as const),
  setIsFollowingInProgress: (isFollowingInProgress: boolean) =>
    ({
      type: 'IN_LINK/PROFILE_REDUCER/SET_IS_FOLLOWING_IN_PROGRESS',
      payload: { isFollowingInProgress },
    } as const),
  setIsUploadingPfp: (isUploadingPfp: boolean) =>
    ({
      type: 'IN_LINK/PROFILE_REDUCER/SET_IS_UPLOADING_PFP',
      payload: { isUploadingPfp },
    } as const),
}

const getData = (
  uid: number,
  action: typeof profileActions.setProfile | typeof profileActions.setMyProfile,
): ProfileThunk => {
  return async (dispatch) => {
    dispatch(profileActions.setLoading(true))
    const data = await profileAPI.getProfile(uid)
    dispatch(action(data))
    dispatch(profileActions.setLoading(false))
  }
}

export const getProfile = (uid: number): ProfileThunk => {
  return async (dispatch, getState) => {
    const isLoading = getState().profilePage.isLoading
    if (isLoading) return void 0
    dispatch(getStatus(uid))
    dispatch(getIsCurrentUserFollowed(uid))
    dispatch(getData(uid, profileActions.setProfile))
  }
}

export const getMyProfile = (uid: number): ProfileThunk => {
  return async (dispatch, getState) => {
    const isLoading = getState().profilePage.isLoading
    if (isLoading) return void 0
    dispatch(getData(uid, profileActions.setMyProfile))
  }
}

export const getStatus = (uid: number): ProfileThunk => {
  return async (dispatch) => {
    const data = await profileAPI.getStatus(uid)
    dispatch(profileActions.setStatus(data))
  }
}

export const updateStatus = (payload: string): ProfileThunk => {
  return async (dispatch) => {
    const result = await profileAPI.updateStatus(payload)
    if (result === ResultCodes.Success) dispatch(profileActions.setStatus(payload))
  }
}

export const uploadPFP = (file: File): ProfileThunk => {
  return async (dispatch) => {
    dispatch(profileActions.setIsUploadingPfp(true))
    const { data, resultCode } = await profileAPI.uploadPFP(file)

    if (resultCode === ResultCodes.Success) {
      dispatch(profileActions.uploadSuccess(data.photos))
    }

    dispatch(profileActions.setIsUploadingPfp(false))
  }
}

export const uploadProfileInfo =
  (profileInfo: InputProfileData, setStatus: (status: FormikStatus) => void): ProfileThunk =>
  async (dispatch, getState): Promise<{ success: boolean }> => {
    if (!getState().profilePage.profileData) throw new Error('Profile data is null')

    const userId = getState().profilePage.profileData!.userId

    const data = await profileAPI.uploadProfileInfo({
      ...profileInfo,
      userId,
    })

    if (data.resultCode === ResultCodes.Success) {
      dispatch(getMyProfile(userId))
      dispatch(setAlertFromThunk({ message: 'profile edited', type: 'success' }))
      return { success: true }
    } else {
      const message = data.messages.length > 0 ? data.messages[0] : 'An error has occurred'

      const regExp = /\(([^)]+)\)/
      const errorLocation = regExp?.exec(message)?.[1]

      if (errorLocation) {
        const errorText = message.slice(0, message.indexOf('(')).trim()
        const parsedLocation = errorLocation.toLowerCase().split('->').join('.')

        setStatus({
          error: { [parsedLocation]: errorText },
        })

        dispatch(setAlertFromThunk({ message: errorText, type: 'error' }))
        return { success: false }
      }

      dispatch(setAlertFromThunk({ message, type: 'error' }))
      return { success: false }
    }
  }

export const getIsCurrentUserFollowed =
  (id: number): ProfileThunk =>
  async (dispatch) => {
    const data = await userAPI.isFollowing(id)
    dispatch(profileActions.setCurrentUserFollowed(data))
  }

const _followUnfollowFlow = (
  id: number,
  request: typeof userAPI.follow | typeof userAPI.unfollow,
  followStatus: boolean,
): ProfileThunk => {
  return async (dispatch) => {
    dispatch(profileActions.setIsFollowingInProgress(true))
    const data = await request(id)

    if (data.resultCode === ResultCodes.Success) {
      dispatch(profileActions.setCurrentUserFollowed(followStatus))
    } else {
      throw new Error(data.messages[0])
    }

    dispatch(profileActions.setIsFollowingInProgress(false))
  }
}

export const followInProfile = (id: number): ProfileThunk => {
  return async (dispatch) => {
    dispatch(_followUnfollowFlow(id, userAPI.follow, true))
  }
}

export const unfollowInProfile = (id: number): ProfileThunk => {
  return async (dispatch) => {
    dispatch(_followUnfollowFlow(id, userAPI.unfollow, false))
  }
}

export default profileReducer
