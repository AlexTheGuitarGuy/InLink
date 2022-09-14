import { updateObjInArr } from '../utils/object-helpers';
import { DialogsUser, UserMessage } from '../types/types';
import User1Image from '../assets/pfps/u1.jpg';
import User2Image from '../assets/pfps/u2.jpg';
import User3Image from '../assets/pfps/u3.jpg';
import User4Image from '../assets/pfps/u4.jpg';

const SEND_MESSAGE = 'IN_LINK/DIALOGS_REDUCER/SEND_MESSAGE';
const DELETE_MESSAGE = 'IN_LINK/DIALOGS_REDUCER/DELETE_MESSAGE';
const EDIT_MESSAGE = 'IN_LINK/DIALOGS_REDUCER/EDIT_MESSAGE';

const initialState = {
  users: [
    {
      avatar: User1Image,
      name: 'Denis Johnson',
    },
    {
      avatar: User2Image,
      name: 'Hannah White',
    },
    {
      avatar: User3Image,
      name: 'Jane Doe',
    },
    {
      avatar: User4Image,
      name: 'Walter Laine',
    },
  ] as DialogsUser[],
  userMessages: [
    [
      {
        name: 'Denis Johnson',
        text: `Lorem Ipsum is simply dummy text`,
        type: 'received',
        avatar: User1Image,
      },
      {
        text: `Where does it come from?
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              `,
        type: 'sent',
      },
      {
        name: 'Denis Johnson',
        text: `accompanied by English versions from the 1914 translation by H. Rackham.`,
        type: 'received',
        avatar: User1Image,
      },
    ],
    [
      {
        name: 'Hannah White',
        text: 'It is a long established fact that a reader will be distracted by the readable content',
        type: 'received',
        avatar: User2Image,
      },
      {
        text: 'has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n',
        type: 'sent',
      },
      {
        text: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below',
        type: 'sent',
      },
      {
        name: 'Hannah White',
        text: 'Lorem Ipsum is simply dummy text',
        type: 'received',
        avatar: User2Image,
      },
      { text: 'Lorem Ipsum is simply dummy text', type: 'sent' },
      {
        name: 'Hannah White',
        text: 'It is a long established fact that a reader will be distracted by the readable content',
        type: 'received',
        avatar: User2Image,
      },
      {
        text: ' with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        type: 'sent',
      },
      {
        text: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below',
        type: 'sent',
      },
      {
        name: 'Hannah White',
        text: 'Lorem Ipsum is simply dummy text',
        type: 'received',
        avatar: User2Image,
      },
      {
        text: 'Lorem Ipsum is simply dummy text',
        type: 'sent',
      },
    ],
    [
      { name: 'Jane Doe', text: 'Where does it come from?', type: 'received', avatar: User3Image },
      {
        text: '"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        type: 'sent',
      },
      { name: 'Jane Doe', text: 'Lorem Ipsum', type: 'received', avatar: User3Image },
      { text: 'Lorem Ipsum', type: 'sent' },
      {
        text: 'Lorem Ipsum used since the 1500s is reproduced below',
        type: 'sent',
      },
    ],
    [
      {
        name: 'Jane Doe',
        text: 'Lorem Ipsum used since the 1500s is reproduced below',
        type: 'received',
        avatar: User4Image,
      },
      {
        text: '"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. ',
        type: 'sent',
      },
      {
        name: 'Jane Doe',
        text: 'Lorem Ipsum',
        type: 'received',
        avatar: User4Image,
      },
      { text: 'Lorem Ipsum is simply dummy text', type: 'sent' },
    ],
  ] as UserMessage[][],
};

export type DialogsReducerState = typeof initialState;

const dialogsReducer = (
  state = initialState,
  action: SendMessageAction | DeleteMessageAction | EditMessageAction,
): DialogsReducerState => {
  switch (action.type) {
    case SEND_MESSAGE:
      if (action.text) {
        return {
          ...state,
          userMessages: state.userMessages.map((e, i) => {
            if (i === action.to)
              e.push({
                text: action.text,
                type: 'sent',
              });
            return e;
          }),
        };
      }
      return {
        ...state,
      };

    /*    case DELETE_MESSAGE:
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
              text: action.text,
            });
          return e;
        }),
      };*/
    default:
      return state;
  }
};

type SendMessageAction = {
  type: typeof SEND_MESSAGE;
  to: number;
  text: string;
};
export const sendMessage = (id: number, text: string): SendMessageAction => ({
  type: SEND_MESSAGE,
  to: id,
  text,
});

type DeleteMessageAction = {
  type: typeof DELETE_MESSAGE;
  userId: number;
  messageId: number;
};
export const deleteMessage = (userId: number, messageId: number): DeleteMessageAction => ({
  type: DELETE_MESSAGE,
  userId,
  messageId,
});

type EditMessageAction = {
  type: typeof EDIT_MESSAGE;
  userId: number;
  messageId: number;
  text: string;
};
export const editMessage = (
  userId: number,
  messageId: number,
  text: string,
): EditMessageAction => ({
  type: EDIT_MESSAGE,
  userId,
  messageId,
  text,
});

export default dialogsReducer;
