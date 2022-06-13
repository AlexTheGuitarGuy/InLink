import { auth } from './auth-reducer';

const APP_INITIALIZED = 'IN_LINK/APP_REDUCER/APP_INITIALIZED';

let defaultState = {
  isAppInitialized: false,
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case APP_INITIALIZED:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const initializeSuccess = () => ({
  type: APP_INITIALIZED,
  payload: { isAppInitialized: true },
});

export const initializeApp = () => async (dispatch) => {
  const authPromise = dispatch(auth());

  await Promise.all([authPromise]);

  dispatch(initializeSuccess());
};

export default appReducer;
