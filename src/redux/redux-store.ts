import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

import dialogsReducer from './dialogs-reducer/dialogs-reducer';
import profileReducer from './profile-reducer/profile-reducer';
import navbarReducer from './navbar-reducer/navbar-reducer';
import usersPageReducer from './users-reducer/users-reducer';
import authReducer from './auth-reducer/auth-reducer';
import appReducer from './app-reducer/app-reducer';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  navbar: navbarReducer,
  usersPage: usersPageReducer,
  auth: authReducer,
  app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type InferAction<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<
  T extends { [key: string]: infer U } ? U : never
>;

export default store;
