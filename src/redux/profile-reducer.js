import { profileAPI } from '../api/API';

const POST = 'POST';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_CAN_EDIT = 'SET_CAN_EDIT';
const TOGGLE_LOADING = 'TOGGLE_LOADING';
const DELETE_POST = 'DELETE_POST';
const EDIT_POST = 'EDIT_POST';

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
        posts: state.posts.map((p) => {
          if (p.id === action.id) p.text = action.data;
          return p;
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

export const getProfile = (uid) => (dispatch) => {
  dispatch(toggleLoading(true));
  profileAPI.getProfile(uid).then((data) => {
    dispatch(setProfile(data));
    dispatch(toggleLoading(false));
  });
};

export const getStatus = (uid) => (dispatch) => {
  dispatch(toggleLoading(true));
  profileAPI.getStatus(uid).then((data) => {
    dispatch(setStatus(data));
    dispatch(toggleLoading(false));
  });
};

export const updateStatus = (payload) => (dispatch) => {
  profileAPI.updateStatus(payload).then((result) => {
    if (result === 0) dispatch(setStatus(payload));
  });
};

export default profileReducer;
