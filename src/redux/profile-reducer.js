import { profileAPI } from '../api/API';
import { updateObjInArr } from '../utils/object-helpers';

const POST = 'GACHI_FINDER/PROFILE_REDUCER/POST';
const SET_PROFILE = 'GACHI_FINDER/PROFILE_REDUCER/SET_PROFILE';
const SET_STATUS = 'GACHI_FINDER/PROFILE_REDUCER/SET_STATUS';
const SET_CAN_EDIT = 'GACHI_FINDER/PROFILE_REDUCER/SET_CAN_EDIT';
const TOGGLE_LOADING = 'GACHI_FINDER/PROFILE_REDUCER/TOGGLE_LOADING';
const DELETE_POST = 'GACHI_FINDER/PROFILE_REDUCER/DELETE_POST';
const EDIT_POST = 'GACHI_FINDER/PROFILE_REDUCER/EDIT_POST';

let defaultState = {
  posts: [
    {
      id: 1,
      text: 'I like coding in React!',
      likes: 333,
    },
    { id: 2, text: 'I really do', likes: 222 },
    {
      id: 3,
      text: 'Especially when everything is already done on stack overflow',
      likes: 111,
    },
  ],
  profileData: null,
  profileStatus: null,
  isLoading: false,
  canEdit: null,
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

    case SET_CAN_EDIT: {
      return {
        ...state,
        canEdit: action.data,
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

export const setCanEdit = (data) => ({
  type: SET_CAN_EDIT,
  data,
});

export const toggleLoading = (payload) => ({
  type: TOGGLE_LOADING,
  payload,
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

export default profileReducer;
