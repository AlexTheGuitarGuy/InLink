import type { PreloadedState } from '@reduxjs/toolkit'
import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { Action, combineReducers } from 'redux'

import appReducer from './app-reducer/app-reducer'
import authReducer from './auth-reducer/auth-reducer'
import chatReducer from './chat-reducer/chat-reducer'
import dialogsReducer from './dialogs-reducer/dialogs-reducer'
import profileReducer from './profile-reducer/profile-reducer'
import usersPageReducer from './users-reducer/users-reducer'

export const rootReducer = combineReducers({
  profilePage: profileReducer,
  chat: chatReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersPageReducer,
  auth: authReducer,
  app: appReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export type InferAction<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type InferThunk<A extends Action, P = void> = ThunkAction<Promise<P>, RootState, unknown, A>
