import { profileAPI } from '../api/API';

const STORE_TEXT = 'STORE-TEXT';
const POST = 'POST';
const SET_PROFILE = 'SET-PROFILE';
const SET_STATUS = 'SET-STATUS';
const SET_CAN_EDIT = 'SET-CAN-EDIT';
const TOGGLE_LOADING = 'TOGGLE-LOADING';

let defaultState = {
  posts: [
    {
      id: 1,
      text: 'Hey buddy I think you got the wrong door the leather club is two blocks down!',
      likes: 420,
    },
    { id: 2, text: 'Hello', likes: 228 },
    { id: 3, text: 'Welcome to the club, buddy.', likes: 69 },
  ],
  storedText: '',
  profileData: null,
  profileStatus: null,
  isLoading: false,
  canEdit: null,
};

const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case STORE_TEXT: {
      return {
        ...state,
        storedText: action.text,
      };
    }
    case POST: {
      if (state.storedText !== '' && state.storedText !== '\n') {
        return {
          ...state,
          posts: [
            ...state.posts,
            {
              id: state.posts.length + 1,
              text: state.storedText,
              likes: 0,
            },
          ],
          storedText: '',
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
    default:
      return state;
  }
};

export const storeText = (text) => ({
  type: STORE_TEXT,
  text,
});
export const post = () => ({ type: POST });

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
