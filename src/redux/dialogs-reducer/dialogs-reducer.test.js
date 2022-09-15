import dialogsReducer, { deleteMessage, editMessage, sendMessage } from './dialogs-reducer';

const state = {
  users: [
    {
      id: 1,
      name: ['Denis', 'Johnson'],
      pfp: <img src={require('../assets/pfps/u1.png')} alt="User1 pfp" />,
    },
    {
      id: 2,
      name: ['John', 'Denison'],
      pfp: <img src={require('../assets/pfps/u2.jpg')} alt="User2 pfp" />,
    },
    {
      id: 3,
      name: ['Chuck', 'Norris'],
      pfp: <img src={require('../assets/pfps/u3.jpg')} alt="User3 pfp" />,
    },
    {
      id: 4,
      name: ['Walter', 'White'],
      pfp: <img src={require('../assets/pfps/u4.jpg')} alt="User4 pfp" />,
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

it('should increment userMessages[0] array length', () => {
  const action = sendMessage(0, 'Hello fellow human being, I am Mark Zuckerberg');

  const newState = dialogsReducer(state, action);

  expect(newState.userMessages[0].length).toBe(4);
});

it('should add message "Hello fellow human being, I am Mark Zuckerberg" to userMessages[0] array', () => {
  const action = sendMessage(0, 'Hello fellow human being, I am Mark Zuckerberg');

  const newState = dialogsReducer(state, action);

  expect(newState.userMessages[0][3].text).toBe('Hello fellow human being, I am Mark Zuckerberg');
});

it('should delete element with id 2 from userMessages[0] array', () => {
  const action = deleteMessage(0, 2);

  const newState = dialogsReducer(state, action);

  expect(newState.userMessages[0].find((e) => e.id === 2)).toBe(undefined);
});

it('should edit element with id 2 from userMessages[0] array to be "Arigatou gozaimasu"', () => {
  const action = editMessage(0, 2, 'Arigatou gozaimasu');

  const newState = dialogsReducer(state, action);

  expect(newState.userMessages[0].find((e) => e.id === 2).text).toBe('Arigatou gozaimasu');
});
