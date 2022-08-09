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
  ] as PostType[],
  profileData: null as ProfileDataType | null,
  myData: null as ProfileDataType | null,
  profileStatus: null as string | null,
  storedText: '',
  isLoading: false,
  isEditing: false,
};

type InitialStateType = typeof initialState;

type ActionType =
  | PostActionType
  | DeletePostActionType
  | EditPostActionType
  | SetEditingActionType
  | SetStatusActionType
  | SetLoadingActionType
  | UploadSuccessActionType
  | SetProfileActionType
  | SetMyProfileActionType;

const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
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
    case SET_STATUS:
    case SET_LOADING:
    case SET_IS_EDITING:
      return {
        ...state,
        ...action.payload,
      };

    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        profileData: { ...state.profileData, photos: { ...action.file } } as ProfileDataType,
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

type PostType = {
  id: number;
  text: string;
  likes: number;
};

type ProfileDataType = {
  aboutMe: string;
  contacts: string[];
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  photos: PhotoType;
  userId: number;
};

type PostActionType = { type: typeof POST; payload: string };
export const post = (payload: string): PostActionType => ({ type: POST, payload });

type DeletePostActionType = { type: typeof DELETE_POST; id: number };
export const deletePost = (id: number): DeletePostActionType => ({ type: DELETE_POST, id });

type EditPostActionType = { type: typeof EDIT_POST; id: number; payload: string };
export const editPost = (id: number, payload: string): EditPostActionType => ({
  type: EDIT_POST,
  id,
  payload,
});

type SetEditingActionType = { type: typeof SET_IS_EDITING; payload: { isEditing: boolean } };
export const setEditing = (isEditing: boolean): SetEditingActionType => ({
  type: SET_IS_EDITING,
  payload: { isEditing },
});

type SetProfileActionType = { type: typeof SET_PROFILE; payload: { profileData: ProfileDataType } };
export const setProfile = (profileData: ProfileDataType): SetProfileActionType => ({
  type: SET_PROFILE,
  payload: { profileData },
});

type SetMyProfileActionType = { type: typeof SET_MY_PROFILE; payload: { myData: ProfileDataType } };
export const setMyProfile = (myData: ProfileDataType): SetMyProfileActionType => ({
  type: SET_MY_PROFILE,
  payload: { myData },
});

type SetStatusActionType = { type: typeof SET_STATUS; payload: { profileStatus: string } };
export const setStatus = (profileStatus: string): SetStatusActionType => ({
  type: SET_STATUS,
  payload: { profileStatus },
});

type SetLoadingActionType = { type: typeof SET_LOADING; payload: { isLoading: boolean } };
export const setLoading = (isLoading: boolean): SetLoadingActionType => ({
  type: SET_LOADING,
  payload: { isLoading },
});

type PhotoType = { small: string; large: string };
type UploadSuccessActionType = { type: typeof UPLOAD_PHOTO_SUCCESS; file: PhotoType };
const uploadSuccess = (file: PhotoType): UploadSuccessActionType => ({
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
  (profileInfo: ProfileDataType) => async (dispatch: any, getState: any) => {
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
