import { createStore, combineReducers, applyMiddleware } from 'redux';
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import userReducer from './user-reducer';
import sidebarReducer from './sidebar-reducer';
import usersPageReducer from './users-page-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  userData: userReducer,
  usersPage: usersPageReducer,
  auth: authReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;
