const SEND_MESSAGE = 'SEND-MESSAGE';
const STORE_MESSAGE_TEXT = 'STORE-MESSAGE-TEXT';

let defaultState = {
    navItems: [
        { to: '/', name: "Home" },
        { to: '/profile', name: "Profile" },
        { to: '/messages', name: "Messages" },
        { to: '/news', name: "News" },
        { to: '/music', name: "Music" },
        { to: '/preferences', name: "Preferences" },
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