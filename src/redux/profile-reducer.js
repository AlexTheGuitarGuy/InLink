import { userAPI } from './../api/API';

const STORE_TEXT = 'STORE-TEXT';
const POST = 'POST';
const SET_PROFILE = 'SET-PROFILE';
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
  isLoading: false,
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
    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
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

export const toggleLoading = () => ({
  type: TOGGLE_LOADING,
});

export const getProfile = (uid) => (dispatch) => {
  dispatch(toggleLoading());
  if (!uid) uid = 2;
  userAPI.loadProfile(uid).then((data) => {
    dispatch(setProfile(data));
    dispatch(toggleLoading());
  });
};

export default profileReducer;
