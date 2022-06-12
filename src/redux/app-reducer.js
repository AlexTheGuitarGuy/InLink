import { auth } from './auth-reducer';

const APP_INITIALIZED = 'GACHI_FINDER/APP_REDUCER/APP_INITIALIZED';

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

export const initializeApp = () => (dispatch) => {
  let authPromise = dispatch(auth());

  Promise.all([authPromise]).then(() => {
    dispatch(initializeSuccess());
  });
};

export default appReducer;
