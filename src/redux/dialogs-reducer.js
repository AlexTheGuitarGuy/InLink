import React from 'react';

const SEND_MESSAGE = 'SEND-MESSAGE';
const STORE_MESSAGE_TEXT = 'STORE-MESSAGE-TEXT';

const defaultState = {
  users: [
    {
      id: 1,
      name: ['Boy', 'Nextdoor'],
      pfp: (
        <img src={require('../assets/pfps/u1.jpg')} alt="User1 pfp" />
      ),
    },
    {
      id: 2,
      name: ['Fucking', 'Slave'],
      pfp: (
        <img src={require('../assets/pfps/u2.png')} alt="User2 pfp" />
      ),
    },
    {
      id: 3,
      name: ['Boss', 'Of This Gym'],
      pfp: (
        <img src={require('../assets/pfps/u3.jpg')} alt="User3 pfp" />
      ),
    },
    {
      id: 4,
      name: ['Dungeon', 'Master'],
      pfp: (
        <img src={require('../assets/pfps/u4.jpg')} alt="User4 pfp" />
      ),
    },
  ],
  userMessages: [
    [
      { id: 1, text: 'Woah! Nice website :)', from: 'them' },
      {
        id: 2,
        text: "Let's celebrate and suck some d*ck!",
        from: 'me',
      },
      {
        id: 3,
        text: 'My father abandoned me when i was 7.',
        from: 'them',
      },
    ],
    [
      { id: 1, text: 'Fisting is 300 bucks', from: 'them' },
      {
        id: 2,
        text: "I'm an artist, i'm a performance artist",
        from: 'me',
      },
      { id: 3, text: 'Have any lotion?', from: 'me' },
      { id: 4, text: "We won't need any ;)", from: 'them' },
      { id: 5, text: 'Oh no...', from: 'me' },
    ],
    [
      { id: 1, text: 'I ripped the skin off!', from: 'them' },
      { id: 2, text: 'Sorry to hear that, buddy', from: 'me' },
      { id: 3, text: ':(', from: 'them' },
      { id: 4, text: ':(', from: 'me' },
      { id: 5, text: 'give me coc', from: 'me' },
    ],
    [
      {
        id: 1,
        text: "Get up you lazy cow. Where's my breakfast?",
        from: 'them',
      },
      { id: 2, text: 'LIKE EMBARRASSING ME, HUH?', from: 'me' },
      {
        id: 3,
        text: "Ok maggots i wanna see six hot loads on your di's hat, now",
        from: 'them',
      },
      { id: 4, text: 'babushka', from: 'me' },
    ],
  ],
  storedText: '',
};

const dialogsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case STORE_MESSAGE_TEXT:
      return {
        ...state,
        storedText: action.text,
      };
    case SEND_MESSAGE:
      if (state.storedText !== '' && state.storedText !== '\n') {
        return {
          ...state,
          userMessages: state.userMessages.map((e, i) => {
            if (i === action.to)
              e.push({
                id: state.userMessages[action.to].length + 1,
                text: state.storedText,
                from: 'me',
              });
            return e;
          }),
          storedText: '',
        };
      }
      return {
        ...state,
        storedText: '',
      };
    default:
      return state;
  }
};

export const sendMessageActionCreator = (id) => ({
  type: SEND_MESSAGE,
  to: id,
});
export const storeMessageTextActionCreator = (text) => ({
  type: STORE_MESSAGE_TEXT,
  text,
});

export default dialogsReducer;
