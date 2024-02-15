import { Alert } from '@/types'
import { auth } from '@/redux/auth-reducer/auth-reducer'
import { InferAction, InferThunk } from '@/redux/store'
import { fetchFrontPageFriends } from '@/redux/users-reducer/users-reducer'
import { ThemeData, getThemeData, setThemeData } from '@/utils/theme-data'

const initialState = {
  isInitializingApp: false,
  isAppInitialized: false,
  isSidebarHidden: false,
  alert: { message: '', type: 'alert' } as Alert,
  theme: getThemeData(),
}

export type AppReducerState = typeof initialState

type AppAction = InferAction<typeof appActions>

type AppThunk = InferThunk<AppAction>

const appReducer = (state = initialState, action: AppAction): AppReducerState => {
  switch (action.type) {
    case 'IN_LINK/APP_REDUCER/APP_INITIALIZED':
    case 'IN_LINK/APP_REDUCER/SET_SIDEBAR_HIDDEN':
    case 'IN_LINK/APP_REDUCER/SET_ALERT':
    case 'IN_LINK/APP_REDUCER/SET_IS_INITIALIZING_APP':
      return {
        ...state,
        ...action.payload,
      }

    case 'IN_LINK/APP_REDUCER/SET_THEME': {
      setThemeData(action.payload.theme)

      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}

export const appActions = {
  initializeSuccess: () =>
    ({
      type: 'IN_LINK/APP_REDUCER/APP_INITIALIZED',
      payload: { isAppInitialized: true },
    } as const),

  setAlert: (alert: Alert) =>
    ({
      type: 'IN_LINK/APP_REDUCER/SET_ALERT',
      payload: { alert },
    } as const),

  setIsSidebarHidden: (isSidebarHidden: boolean) =>
    ({
      type: 'IN_LINK/APP_REDUCER/SET_SIDEBAR_HIDDEN',
      payload: { isSidebarHidden },
    } as const),
  setTheme: (theme: ThemeData) =>
    ({
      type: 'IN_LINK/APP_REDUCER/SET_THEME',
      payload: { theme },
    } as const),

  setIsInitializingApp: (isInitializingApp: boolean) =>
    ({
      type: 'IN_LINK/APP_REDUCER/SET_IS_INITIALIZING_APP',
      payload: { isInitializingApp },
    } as const),
}

export const setAlertFromThunk =
  (alert: Alert): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAlert(alert))
  }

export const initializeApp = (): AppThunk => async (dispatch, getState) => {
  const { isAppInitialized, isInitializingApp } = getState().app
  if (isAppInitialized || isInitializingApp) return void 0
  dispatch(appActions.setIsInitializingApp(true))

  const authUser = getState().auth.id
  const frontPageFriends = getState().usersPage.frontPageFriends

  const promises: Promise<unknown>[] = []
  if (!authUser) promises.push(dispatch(auth()))
  if (!frontPageFriends.length) promises.push(dispatch(fetchFrontPageFriends()))

  await Promise.all(promises)

  dispatch(appActions.setIsInitializingApp(false))
  dispatch(appActions.initializeSuccess())
}

export default appReducer
