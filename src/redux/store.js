import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import userReducer from './user-reducer';
import sidebarReducer from './sidebar-reducer';


let store = {

    _state: {
        userData: {
            profileData: { id: 0, name: "Me", pfp: <img src={require("C:/Users/andut/Desktop/code/react_projects/01/suka/src/redux/photos/UsersPfp/u0.jpg")} alt='My pfp' /> },
            
        },

        profilePage: {
            posts: [
                { id: 1, text: 'Swallow my cum ;)', likes: 420 },
                { id: 2, text: 'Futeo nahui', likes: 228 },
                { id: 3, text: 'Welcome to the club, buddy.', likes: 69 },
            ],
            storedText: '',
        },

        dialogsPage: {
            users: [
                { id: 1, name: ["Boy", " Nextdoor"], pfp: <img src={require("C:/Users/andut/Desktop/code/react_projects/01/suka/src/redux/photos/UsersPfp/u1.jpg")} alt='User1 pfp' /> },
                { id: 2, name: ["Fucking", " Slave"], pfp: <img src={require("C:/Users/andut/Desktop/code/react_projects/01/suka/src/redux/photos/UsersPfp/u2.png")} alt='User2 pfp' /> },
                { id: 3, name: ["Boss", " Of This Gym"], pfp: <img src={require("C:/Users/andut/Desktop/code/react_projects/01/suka/src/redux/photos/UsersPfp/u3.jpg")} alt='User3 pfp' /> },
                { id: 4, name: ["Dungeon", " Master"], pfp: <img src={require("C:/Users/andut/Desktop/code/react_projects/01/suka/src/redux/photos/UsersPfp/u4.jpg")} alt='User4 pfp' /> },
            ],
            userMessages: [
                [
                    { text: "Woah! Nice website :)", from: "them" },
                    { text: "Let's celebrate and suck some dick!", from: "me" },
                    { text: "My father abandoned me when i was 7.", from: "them" },
                ],
                [
                    { text: "Wanna fuck?", from: "them" },
                    { text: "Yeah", from: "me" },
                    { text: "Have any lotion?", from: "me" },
                    { text: "We won't need any ;)", from: "them" },
                    { text: "Oh no...", from: "me" },
                ],
                [
                    { text: "I hate christians!!!", from: "them" },
                    { text: "Ilie, tu?", from: "me" },
                    { text: "CUM TIAI DAT SEAMA PIDAR", from: "them" },
                    { text: "intuitia mia zis", from: "me" },
                    { text: "show penis", from: "me" },
                ],
                [
                    { text: "kurwa", from: "them" },
                    { text: "blea", from: "me" },
                    { text: "pizdec", from: "them" },
                    { text: "nahui", from: "me" },
                    { text: "babushka", from: "me" },
                ],
            ],
            storedText: '',
        },

        sidebar: {
            navItems: [
                { to: '/', name: "Home" },
                { to: '/profile', name: "Profile" },
                { to: '/messages', name: "Messages" },
                { to: '/news', name: "News" },
                { to: '/music', name: "Music" },
                { to: '/preferences', name: "Preferences" },
            ]
        }
    },

    getState() {
        return (this._state);
    },

    _callSubscriber() {
        console.log("rerendered");
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    //dispatch methods below

    dispatch(action) {
 
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        
        this._callSubscriber(this._state);
    },

}
window.store = store;

export default store;