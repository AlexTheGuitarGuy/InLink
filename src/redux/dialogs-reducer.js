import { updateObjInArr } from '../utils/object-helpers';

const SEND_MESSAGE = 'IN_LINK/DIALOGS_REDUCER/SEND_MESSAGE';
const DELETE_MESSAGE = 'IN_LINK/DIALOGS_REDUCER/DELETE_MESSAGE';
const EDIT_MESSAGE = 'IN_LINK/DIALOGS_REDUCER/EDIT_MESSAGE';

const defaultState = {
  users: [
    {
      id: 1,
      name: 'Denis Johnson',
    },
    {
      id: 2,
      name: 'Hannah White',
    },
    {
      id: 3,
      name: 'Jane Doe',
    },
    {
      id: 4,
      name: 'Walter Laine',
    },
  ],

  userMessages: [
    [
      {
        id: 1,
        text: `Lorem Ipsum is simply dummy text `,
        from: 'them',
      },
      {
        id: 2,
        text: `Where does it come from?
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              `,
        from: 'me',
      },
      {
        id: 3,
        text: ` accompanied by English versions from the 1914 translation by H. Rackham.`,
        from: 'them',
      },
    ],
    [
      {
        id: 1,
        text: 'It is a long established fact that a reader will be distracted by the readable content',
        from: 'them',
      },
      {
        id: 2,
        text: 'has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n',
        from: 'me',
      },
      {
        id: 3,
        text: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below',
        from: 'me',
      },
      {
        id: 4,
        text: 'Lorem Ipsum is simply dummy text',
        from: 'them',
      },
      { id: 5, text: 'Lorem Ipsum is simply dummy text', from: 'me' },
      {
        id: 6,
        text: 'It is a long established fact that a reader will be distracted by the readable content',
        from: 'them',
      },
      {
        id: 7,
        text: ' with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        from: 'me',
      },
      {
        id: 8,
        text: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below',
        from: 'me',
      },
      {
        id: 9,
        text: 'Lorem Ipsum is simply dummy text',
        from: 'them',
      },
      {
        id: 10,
        text: 'Lorem Ipsum is simply dummy text',
        from: 'me',
      },
    ],
    [
      { id: 1, text: 'Where does it come from?', from: 'them' },
      {
        id: 2,
        text: '"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        from: 'me',
      },
      { id: 3, text: 'Lorem Ipsum', from: 'them' },
      { id: 4, text: 'Lorem Ipsum', from: 'me' },
      {
        id: 5,
        text: 'Lorem Ipsum used since the 1500s is reproduced below',
        from: 'me',
      },
    ],
    [
      {
        id: 1,
        text: 'Lorem Ipsum used since the 1500s is reproduced below',
        from: 'them',
      },
      {
        id: 2,
        text: '"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. ',
        from: 'me',
      },
      {
        id: 3,
        text: 'Lorem Ipsum',
        from: 'them',
      },
      { id: 4, text: 'Lorem Ipsum is simply dummy text', from: 'me' },
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

    case DELETE_MESSAGE:
      return {
        ...state,
        userMessages: state.userMessages.map((e, i) => {
          if (i === action.userId) return e.filter((m) => m.id !== action.messageId);
          return e;
        }),
      };

    case EDIT_MESSAGE:
      return {
        ...state,
        userMessages: state.userMessages.map((e, i) => {
          if (i === action.userId)
            return updateObjInArr(e, 'id', action.messageId, {
              text: action.data,
            });
          return e;
        }),
      };
    default:
      return state;
  }
};

export const sendMessage = (id, data) => ({
  type: SEND_MESSAGE,
  to: id,
  data,
});

export const deleteMessage = (userId, messageId) => ({
  type: DELETE_MESSAGE,
  userId,
  messageId,
});

export const editMessage = (userId, messageId, data) => ({
  type: EDIT_MESSAGE,
  userId,
  messageId,
  data,
});

export default dialogsReducer;
