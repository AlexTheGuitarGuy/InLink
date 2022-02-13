import { createStore, combineReducers } from 'redux';
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import userReducer from './user-reducer';
import sidebarReducer from './sidebar-reducer';
import usersPageReducer from './users-page-reducer';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  userData: userReducer,
  usersPage: usersPageReducer,
});

const store = createStore(reducers);
window.store = store;

export default store;
