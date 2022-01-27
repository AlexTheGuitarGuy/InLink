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
}

const dialogsReducer = (state = defaultState, action) => {

    switch (action.type) {

        case STORE_MESSAGE_TEXT:
            state.storedText = action.text;
            return (state);
        case SEND_MESSAGE:

            if (state.storedText !== '' && state.storedText !== '\n') {

                let newMessage = {
                    text: state.storedText,
                    from: "me",
                };

                state.userMessages[3].push(newMessage);

            }
            state.storedText = '';
            return (state);
        default: return (state);

    }
}

export const sendMessageActionCreator = () => ({type:SEND_MESSAGE});
export const storeMessageTextActionCreator = (text) => ({type:STORE_MESSAGE_TEXT, text: text});

export default dialogsReducer;