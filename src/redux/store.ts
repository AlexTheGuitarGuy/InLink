import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { ThunkAction } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import dialogsReducer from './dialogs-reducer/dialogs-reducer'
import profileReducer from './profile-reducer/profile-reducer'
import navbarReducer from './navbar-reducer/navbar-reducer'
import usersPageReducer from './users-reducer/users-reducer'
import authReducer from './auth-reducer/auth-reducer'
import appReducer from './app-reducer/app-reducer'
import chatReducer from './chat-reducer/chat-reducer'

const reducers = combineReducers({
  profilePage: profileReducer,
  chat: chatReducer,
  dialogsPage: dialogsReducer,
  navbar: navbarReducer,
  usersPage: usersPageReducer,
  auth: authReducer,
  app: appReducer,
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.__store__ = store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = any

export type InferAction<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type InferThunk<A extends Action, P = void> = ThunkAction<Promise<P>, RootState, unknown, A>

export default store
