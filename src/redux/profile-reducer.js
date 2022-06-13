import { profileAPI } from '../api/API';
import { updateObjInArr } from '../utils/object-helpers';
import { stopSubmit } from 'redux-form';

const POST = 'IN_LINK/PROFILE_REDUCER/POST';
const SET_PROFILE = 'IN_LINK/PROFILE_REDUCER/SET_PROFILE';
const SET_STATUS = 'IN_LINK/PROFILE_REDUCER/SET_STATUS';
const TOGGLE_LOADING = 'IN_LINK/PROFILE_REDUCER/TOGGLE_LOADING';
const DELETE_POST = 'IN_LINK/PROFILE_REDUCER/DELETE_POST';
const EDIT_POST = 'IN_LINK/PROFILE_REDUCER/EDIT_POST';
const UPLOAD_PHOTO_SUCCESS =
  'IN_LINK/PROFILE_REDUCER/UPLOAD_PHOTO_SUCCESS';
const SET_IS_EDITING = 'IN_LINK/PROFILE_REDUCER/SET_IS_EDITING';

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
  isEditing: false,
};

const profileReducer = (state = defaultState, action) => {
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
    case SET_STATUS:
    case TOGGLE_LOADING:
    case SET_IS_EDITING:
    case SET_PROFILE:
      return {
        ...state,
        ...action.payload,
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

export const post = (payload) => ({ type: POST, payload });

export const deletePost = (id) => ({ type: DELETE_POST, id });

export const editPost = (id, payload) => ({
  type: EDIT_POST,
  id,
  payload,
});

export const setEditing = (isEditing) => ({
  type: SET_IS_EDITING,
  payload: { isEditing },
});

export const setProfile = (profileData) => ({
  type: SET_PROFILE,
  payload: { profileData },
});

export const setStatus = (profileStatus) => ({
  type: SET_STATUS,
  payload: { profileStatus },
});

export const toggleLoading = (isLoading) => ({
  type: TOGGLE_LOADING,
  payload: { isLoading },
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

    if (data.resultCode === 0) {
      dispatch(getProfile(userId));
      dispatch(setEditing(false));
    } else {
      const message =
        data.messages.length > 0
          ? data.messages[0]
          : 'An error has occurred';

      const regExp = /\(([^)]+)\)/;
      const errorLocation =
        regExp.exec(message) && regExp.exec(message)[1];

      if (errorLocation) {
        const errorText = message.slice(0, message.indexOf('('));
        const parsedLocation = errorLocation
          .toLowerCase()
          .split('->');
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
