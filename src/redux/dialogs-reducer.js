import React from 'react';

const SEND_MESSAGE = 'SEND-MESSAGE';

const defaultState = {
  users: [
    {
      id: 1,
      name: ['Denis', 'Johnson'],
      pfp: (
        <img src={require('../assets/pfps/u1.jpg')} alt="User1 pfp" />
      ),
    },
    {
      id: 2,
      name: ['John', 'Denison'],
      pfp: (
        <img src={require('../assets/pfps/u2.png')} alt="User2 pfp" />
      ),
    },
    {
      id: 3,
      name: ['Chuck', 'Norris'],
      pfp: (
        <img src={require('../assets/pfps/u3.jpg')} alt="User3 pfp" />
      ),
    },
    {
      id: 4,
      name: ['Walter', 'White'],
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
        text: 'Thanks!',
        from: 'me',
      },
      {
        id: 3,
        text: 'You will nail that interview!',
        from: 'them',
      },
    ],
    [
      { id: 1, text: 'Who are you?', from: 'them' },
      {
        id: 2,
        text: "I'm an artist, i'm a performance artist",
        from: 'me',
      },
      { id: 3, text: "I'm also a baker", from: 'me' },
      { id: 4, text: "That's cool!", from: 'them' },
      { id: 5, text: 'Thanks', from: 'me' },
    ],
    [
      { id: 1, text: 'Hi', from: 'them' },
      { id: 2, text: 'Hello', from: 'me' },
      { id: 3, text: 'Bye', from: 'them' },
      { id: 4, text: 'Goodbye :)', from: 'me' },
      { id: 5, text: ':)', from: 'me' },
    ],
    [
      {
        id: 1,
        text: 'Do you code in react?',
        from: 'them',
      },
      { id: 2, text: 'Yeah, i do', from: 'me' },
      {
        id: 3,
        text: 'Cool',
        from: 'them',
      },
      { id: 4, text: 'yeah', from: 'me' },
    ],
  ],
};

const dialogsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      if (action.data) {
        return {
          ...state,
          userMessages: state.userMessages.map((e, i) => {
            if (i === action.to)
              e.push({
                id: state.userMessages[action.to].length + 1,
                text: action.data,
                from: 'me',
              });
            return e;
          }),
        };
      }
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const send = (id, data) => ({
  type: SEND_MESSAGE,
  to: id,
  data,
});

export default dialogsReducer;
