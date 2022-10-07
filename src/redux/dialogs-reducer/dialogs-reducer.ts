import { UserMessage } from '../../types/types'
import { InferAction } from '../redux-store'

const initialState = {
  userMessages: [
    [
      {
        text: `Lorem Ipsum is simply dummy text`,
        type: 'received',
      },
      {
        text: `Where does it come from?
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              `,
        type: 'sent',
      },
      {
        text: `accompanied by English versions from the 1914 translation by H. Rackham.`,
        type: 'received',
      },
    ],
    [
      {
        text: 'It is a long established fact that a reader will be distracted by the readable content',
        type: 'received',
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
        text: 'Lorem Ipsum is simply dummy text',
        type: 'received',
      },
      { text: 'Lorem Ipsum is simply dummy text', type: 'sent' },
      {
        text: 'It is a long established fact that a reader will be distracted by the readable content',
        type: 'received',
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
        text: 'Lorem Ipsum is simply dummy text',
        type: 'received',
      },
      {
        text: 'Lorem Ipsum is simply dummy text',
        type: 'sent',
      },
    ],
    [
      { text: 'Where does it come from?', type: 'received' },
      {
        text: '"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        type: 'sent',
      },
      { text: 'Lorem Ipsum', type: 'received' },
      { text: 'Lorem Ipsum', type: 'sent' },
      {
        text: 'Lorem Ipsum used since the 1500s is reproduced below',
        type: 'sent',
      },
    ],
    [
      {
        text: 'Lorem Ipsum used since the 1500s is reproduced below',
        type: 'received',
      },
      {
        text: '"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. ',
        type: 'sent',
      },
      {
        text: 'Lorem Ipsum',
        type: 'received',
      },
      { text: 'Lorem Ipsum is simply dummy text', type: 'sent' },
    ],
  ] as UserMessage[][],
}

export type DialogsReducerState = typeof initialState

type DialogAction = InferAction<typeof dialogsActions>

const dialogsReducer = (state = initialState, action: DialogAction): DialogsReducerState => {
  switch (action.type) {
    case 'IN_LINK/DIALOGS_REDUCER/SEND_MESSAGE':
      if (action.text) {
        return {
          ...state,
          userMessages: state.userMessages.map((e, i) => {
            if (i === action.to)
              e.push({
                text: action.text,
                type: 'sent',
              })
            return e
          }),
        }
      }
      return {
        ...state,
      }

    /*    case 'IN_LINK/DIALOGS_REDUCER/DELETE_MESSAGE':
      return {
        ...state,
        userMessages: state.userMessages.map((e, i) => {
          if (i === action.userId) return e.filter((m) => m.id !== action.messageId);
          return e;
        }),
      };

    case 'IN_LINK/DIALOGS_REDUCER/EDIT_MESSAGE':
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
      return state
  }
}

export const dialogsActions = {
  sendMessage: (id: number, text: string) =>
    ({
      type: 'IN_LINK/DIALOGS_REDUCER/SEND_MESSAGE',
      to: id,
      text,
    } as const),

  deleteMessage: (userId: number, messageId: number) =>
    ({
      type: 'IN_LINK/DIALOGS_REDUCER/DELETE_MESSAGE',
      userId,
      messageId,
    } as const),

  editMessage: (userId: number, messageId: number, text: string) =>
    ({
      type: 'IN_LINK/DIALOGS_REDUCER/EDIT_MESSAGE',
      userId,
      messageId,
      text,
    } as const),
}

export default dialogsReducer
