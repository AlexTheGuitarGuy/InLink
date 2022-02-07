const SEND_MESSAGE = 'SEND-MESSAGE';
const STORE_MESSAGE_TEXT = 'STORE-MESSAGE-TEXT';

let defaultState = {
    users: [
        { id: 1, name: ["Boy", " Nextdoor"], pfp: <img src={require("C:/Users/andut/Desktop/code/react_projects/01/suka/src/redux/photos/UsersPfp/u1.jpg")} alt='User1 pfp' /> },
        { id: 2, name: ["Fucking", " Slave"], pfp: <img src={require("C:/Users/andut/Desktop/code/react_projects/01/suka/src/redux/photos/UsersPfp/u2.png")} alt='User2 pfp' /> },
        { id: 3, name: ["Boss", " Of This Gym"], pfp: <img src={require("C:/Users/andut/Desktop/code/react_projects/01/suka/src/redux/photos/UsersPfp/u3.jpg")} alt='User3 pfp' /> },
        { id: 4, name: ["Dungeon", " Master"], pfp: <img src={require("C:/Users/andut/Desktop/code/react_projects/01/suka/src/redux/photos/UsersPfp/u4.jpg")} alt='User4 pfp' /> },
    ],
    userMessages: [
        [
            { id: 1, text: "Woah! Nice website :)", from: "them" },
            { id: 2, text: "Let's celebrate and suck some dick!", from: "me" },
            { id: 3, text: "My father abandoned me when i was 7.", from: "them" },
        ],
        [
            { id: 1, text: "Wanna fuck?", from: "them" },
            { id: 2, text: "Yeah", from: "me" },
            { id: 3, text: "Have any lotion?", from: "me" },
            { id: 4, text: "We won't need any ;)", from: "them" },
            { id: 5, text: "Oh no...", from: "me" },
        ],
        [
            { id: 1, text: "I hate christians!!!", from: "them" },
            { id: 2,text: "Ilie, tu?", from: "me" },
            { id: 3, text: "CUM TIAI DAT SEAMA PIDAR", from: "them" },
            { id: 4, text: "intuitia mia zis", from: "me" },
            { id: 5, text: "show penis", from: "me" },
        ],
        [
            { id: 1, text: "kurwa", from: "them" },
            { id: 2, text: "blea", from: "me" },
            { id: 3, text: "pizdec", from: "them" },
            { id: 4, text: "nahui", from: "me" },
            { id: 5, text: "babushka", from: "me" },
        ],
    ],
    storedText: '',
}

const dialogsReducer = (state = defaultState, action) => {

    switch (action.type) {

        case STORE_MESSAGE_TEXT:
            return {
                ...state,
                storedText: action.text,
            }
        case SEND_MESSAGE:

            if (state.storedText !== '' && state.storedText !== '\n') {
                let newMessages = [...state.userMessages,];
                newMessages[3].push({id: state.userMessages[3].length + 1, text: state.storedText, from: 'me' })
                return {
                    ...state,
                    userMessages: newMessages,
                    storedText: '',
                }

            }
            return {
                ...state,
                storedText: '',
            }
        default: return (state);

    }
}

export const sendMessageActionCreator = (id) => ({ type: SEND_MESSAGE });
export const storeMessageTextActionCreator = (text) => ({ type: STORE_MESSAGE_TEXT, text: text });

export default dialogsReducer;