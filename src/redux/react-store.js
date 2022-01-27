import {createStore, combineReducers} from "redux";
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import userReducer from './user-reducer';
import sidebarReducer from './sidebar-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    userData: userReducer,
})

let store = createStore(reducers);

export default store;