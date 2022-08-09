import { stopSubmit } from 'redux-form';
import { profileAPI } from '../api/API';
import { updateObjInArr } from '../utils/object-helpers';

const POST = 'IN_LINK/PROFILE_REDUCER/POST';
const SET_PROFILE = 'IN_LINK/PROFILE_REDUCER/SET_PROFILE';
const SET_MY_PROFILE = 'IN_LINK/PROFILE_REDUCER/SET_MY_PROFILE';
const SET_STATUS = 'IN_LINK/PROFILE_REDUCER/SET_STATUS';
const SET_LOADING = 'IN_LINK/PROFILE_REDUCER/SET_LOADING';
const DELETE_POST = 'IN_LINK/PROFILE_REDUCER/DELETE_POST';
const EDIT_POST = 'IN_LINK/PROFILE_REDUCER/EDIT_POST';
const UPLOAD_PHOTO_SUCCESS = 'IN_LINK/PROFILE_REDUCER/UPLOAD_PHOTO_SUCCESS';
const SET_IS_EDITING = 'IN_LINK/PROFILE_REDUCER/SET_IS_EDITING';

type postActionType = { type: typeof POST; payload: string };
type deletePostActionType = { type: typeof DELETE_POST; id: number };
type editPostActionType = { type: typeof EDIT_POST; id: number; payload: string };
type setEditingActionType = { type: typeof SET_IS_EDITING; isEditing: boolean };
type setStatusActionType = { type: typeof SET_STATUS; profileStatus: string };
type setLoadingActionType = { type: typeof SET_LOADING; isLoading: boolean };

type postType = {
  id: number;
  text: string;
  likes: number;
};

type photoType = { small: string; large: string };

type uploadSuccessActionType = { type: typeof UPLOAD_PHOTO_SUCCESS; file: photoType };

type profileDataType = {
  aboutMe: string;
  contacts: string[];
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  photos: photoType;
  userId: number;
};

type setProfileActionType = { type: typeof SET_PROFILE; payload: profileDataType };
type setMyProfileActionType = { type: typeof SET_MY_PROFILE; payload: profileDataType };

type initialStateType = {
  posts: postType[];
  profileData: profileDataType | null;
  myData: profileDataType | null;
  profileStatus: string | null;
  isLoading: boolean;
  isEditing: boolean;
};

const initialState = {
  posts: [
    {
      id: 1,
      text: 'Hello world',
      likes: 333,
    },
    { id: 2, text: 'I am a coder in react!', likes: 222 },
    {
      id: 3,
      text: 'I code everyday',
      likes: 111,
    },
  ],
  profileData: null,
  myData: null,
  profileStatus: null,
  isLoading: false,
  isEditing: false,
};

type actionType =
  | postActionType
  | deletePostActionType
  | editPostActionType
  | setEditingActionType
  | setStatusActionType
  | setStatusActionType
  | setLoadingActionType
  | uploadSuccessActionType
  | setProfileActionType
  | setMyProfileActionType;

const profileReducer = (state: initialStateType = initialState, action: actionType) => {
  switch (action.type) {
    case POST: {
      if (action.payload) {
        return {
          ...state,
          posts: [
            ...state.posts,
            {
              id: state.posts.length + 1,
              text: action.payload,
              likes: 0,
            },
          ],
        };
      }

      return {
        ...state,
        storedText: '',
      };
    }

    case SET_PROFILE:
    case SET_MY_PROFILE:
      return {
        ...state,
        ...action.payload,
      };

    case SET_STATUS:
      return {
        ...state,
        profileStatus: action.profileStatus,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SET_IS_EDITING:
      return {
        ...state,
        isEditing: action.isEditing,
      };

    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        profileData: { ...state.profileData, ...action.file },
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.id),
      };

    case EDIT_POST:
      return {
        ...state,
        posts: updateObjInArr(state.posts, 'id', action.id, {
          text: action.payload,
        }),
      };

    default:
      return state;
  }
};

export const post = (payload: string) => ({ type: POST, payload });

export const deletePost = (id: number) => ({ type: DELETE_POST, id });

export const editPost = (id: number, payload: string) => ({
  type: EDIT_POST,
  id,
  payload,
});

export const setEditing = (isEditing: boolean) => ({
  type: SET_IS_EDITING,
  isEditing,
});

export const setProfile = (profileData: profileDataType) => ({
  type: SET_PROFILE,
  payload: { profileData },
});

export const setMyProfile = (myData: profileDataType) => ({
  type: SET_MY_PROFILE,
  payload: { myData },
});

export const setStatus = (profileStatus: string) => ({
  type: SET_STATUS,
  profileStatus,
});

export const setLoading = (isLoading: boolean) => ({
  type: SET_LOADING,
  isLoading,
});

const uploadSuccess = (file: photoType) => ({
  type: UPLOAD_PHOTO_SUCCESS,
  file,
});

const getData = (uid: number, action: typeof setProfile | typeof setMyProfile) => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    const data = await profileAPI.getProfile(uid);
    dispatch(action(data));
    dispatch(setLoading(false));
  };
};

export const getProfile = (uid: number) => {
  return async (dispatch: any) => {
    dispatch(getData(uid, setProfile));
  };
};

export const getMyProfile = (uid: number) => {
  return async (dispatch: any) => {
    dispatch(getData(uid, setMyProfile));
  };
};

export const getStatus = (uid: number) => {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    const data = await profileAPI.getStatus(uid);
    dispatch(setStatus(data));
    dispatch(setLoading(false));
  };
};

export const updateStatus = (payload: string) => {
  return async (dispatch: any) => {
    const result = await profileAPI.updateStatus(payload);
    if (result === 0) dispatch(setStatus(payload));
  };
};

export const uploadPFP = (file: File) => {
  return async (dispatch: any) => {
    const { data, resultCode } = await profileAPI.uploadPFP(file);

    if (resultCode === 0) dispatch(uploadSuccess(data));
  };
};

export const uploadProfileInfo =
  (profileInfo: profileDataType) => async (dispatch: any, getState: any) => {
    const { userId } = getState().profilePage.profileData;

    const data = await profileAPI.uploadProfileInfo({
      ...profileInfo,
    });

    if (data.resultCode === 0) {
      dispatch(getProfile(userId));
      dispatch(setEditing(false));
      return Promise.resolve('profile edited');
    } else {
      const message = data.messages.length > 0 ? data.messages[0] : 'An error has occurred';

      const regExp = /\(([^)]+)\)/;
      const errorLocation = regExp?.exec(message)?.[1];

      if (errorLocation) {
        const errorText = message.slice(0, message.indexOf('('));
        const parsedLocation = errorLocation.toLowerCase().split('->');
        dispatch(
          stopSubmit('profileInfo', {
            [parsedLocation[0]]: { [parsedLocation[1]]: errorText },
          }),
        );
      } else dispatch(stopSubmit('profileInfo', { _error: message }));
      return Promise.reject(message);
    }
  };

export default profileReducer;
