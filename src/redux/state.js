const STORE_TEXT = 'STORE-TEXT';
const ADD_POST = 'ADD-POST';
const SEND_MESSAGE = 'SEND-MESSAGE';

let store = {

    _state: {
        userData: {
            profileData: { id: 0, name: "Me", pfp: <img src={require("C:/Users/andut/Desktop/code/react_projects/01/suka/src/redux/photos/UsersPfp/u0.jpg")} alt='My pfp' /> },
            storedText: '',
        },

        profilePage: {
            posts: [
                { id: 1, text: 'Swallow my cum ;)', likes: 420 },
                { id: 2, text: 'Futeo nahui', likes: 228 },
                { id: 3, text: 'Welcome to the club, buddy.', likes: 69 },
            ],
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

        if (action.type === STORE_TEXT) {
            this._state.userData.storedText = action.text;
            this._callSubscriber(this._state);
        }
        else if (action.type === ADD_POST) {
            if (this._state.userData.storedText !== '' && this._state.userData.storedText !== '\n') {
                let newPost = {
                    id: this._state.profilePage.posts.length + 1,
                    text: this._state.userData.storedText,
                    likes: 0,
                };

                this._state.profilePage.posts.push(newPost);

            }
            this._callSubscriber(this._state);
            this._state.userData.storedText = '';
        }
        else if (action.type === SEND_MESSAGE) {

            if (this._state.userData.storedText !== '' && this._state.userData.storedText !== '\n') {

                let newMessage = {
                    text: this._state.userData.storedText,
                    from: "me",
                };

                this._state.dialogsPage.userMessages[3].push(newMessage);

            }
            this._callSubscriber(this._state);
            this._state.userData.storedText = '';
        }
        else (alert(`no such action type: ${action.type}`))

    },

}

export const storeTextActionCreator = (text) => ({type:STORE_TEXT, text: text});
export const addPostActionCreator = () => ({type:ADD_POST});
export const sendMessageActionCreator = () => ({type:SEND_MESSAGE});

window.store = store;

export default store;