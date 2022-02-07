const SEND_MESSAGE = 'SEND-MESSAGE';
const STORE_MESSAGE_TEXT = 'STORE-MESSAGE-TEXT';

let defaultState = {
    navItems: [
        { id: 1, to: '/', name: "Home" },
        { id: 2, to: '/profile', name: "Profile" },
        { id: 3, to: '/messages', name: "Messages" },
        { id: 4, to: '/news', name: "News" },
        { id: 5, to: '/music', name: "Music" },
        { id: 6, to: '/preferences', name: "Preferences" },
    ]
}

const sidebarReducer = (state = defaultState, action) => {

    switch (action.type) {

        default: return (state);

    }
}

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE });
export const storeMessageTextActionCreator = (text) => ({ type: STORE_MESSAGE_TEXT, text: text });

export default sidebarReducer;