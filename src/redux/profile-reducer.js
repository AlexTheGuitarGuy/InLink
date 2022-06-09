import { profileAPI } from '../api/API';
import { updateObjInArr } from '../utils/object-helpers';
import { stopSubmit } from 'redux-form';

const POST = 'GACHI_FINDER/PROFILE_REDUCER/POST';
const SET_PROFILE = 'GACHI_FINDER/PROFILE_REDUCER/SET_PROFILE';
const SET_STATUS = 'GACHI_FINDER/PROFILE_REDUCER/SET_STATUS';
const TOGGLE_LOADING = 'GACHI_FINDER/PROFILE_REDUCER/TOGGLE_LOADING';
const DELETE_POST = 'GACHI_FINDER/PROFILE_REDUCER/DELETE_POST';
const EDIT_POST = 'GACHI_FINDER/PROFILE_REDUCER/EDIT_POST';
const UPLOAD_PHOTO_SUCCESS =
  'GACHI_FINDER/PROFILE_REDUCER/UPLOAD_PHOTO_SUCCESS';

let defaultState = {
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
  profileStatus: null,
  isLoading: false,
};

const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case POST: {
      if (action.data) {
        return {
          ...state,
          posts: [
            ...state.posts,
            {
              id: state.posts.length + 1,
              text: action.data,
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

    case SET_PROFILE: {
      return {
        ...state,
        profileData: action.data,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        profileStatus: action.data,
      };
    }

    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: action.payload,
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
          text: action.data,
        }),
      };
    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        profileData: { ...state.profileData, ...action.file },
      };
    default:
      return state;
  }
};

export const post = (data) => ({ type: POST, data });

export const deletePost = (id) => ({ type: DELETE_POST, id });

export const editPost = (id, data) => ({
  type: EDIT_POST,
  id,
  data,
});

export const setProfile = (data) => ({ type: SET_PROFILE, data });

export const setStatus = (data) => ({ type: SET_STATUS, data });

export const toggleLoading = (payload) => ({
  type: TOGGLE_LOADING,
  payload,
});

const uploadSuccess = (file) => ({
  type: UPLOAD_PHOTO_SUCCESS,
  file,
});

export const getProfile = (uid) => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    const data = await profileAPI.getProfile(uid);
    dispatch(setProfile(data));
    dispatch(toggleLoading(false));
  };
};

export const getStatus = (uid) => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    const data = await profileAPI.getStatus(uid);
    dispatch(setStatus(data));
    dispatch(toggleLoading(false));
  };
};

export const updateStatus = (payload) => {
  return async (dispatch) => {
    const result = await profileAPI.updateStatus(payload);
    if (result === 0) dispatch(setStatus(payload));
  };
};

export const uploadPFP = (file) => {
  return async (dispatch) => {
    const { data, resultCode } = await profileAPI.uploadPFP(file);

    if (resultCode === 0) dispatch(uploadSuccess(data));
  };
};

export const uploadProfileInfo =
  (profileInfo) => async (dispatch, getState) => {
    const userId = getState().profilePage.profileData.userId;

    const data = await profileAPI.uploadProfileInfo({
      userId,
      ...profileInfo,
    });

    if (data.resultCode === 0) dispatch(getProfile(userId));
    else {
      const message =
        data.messages.length > 0
          ? data.messages[0]
          : 'An error has occurred';
      dispatch(stopSubmit('profileInfo', { _error: message }));
    }

    return data.resultCode;
  };

export default profileReducer;
