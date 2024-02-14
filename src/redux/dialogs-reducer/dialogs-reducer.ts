import { v1 as uuidv1 } from 'uuid'
import { UserMessage } from '@/types'
import { updateObjInArr } from '@/utils/object-helpers'
import { InferAction } from '@/redux/store'

const initialState = {
  userMessages: [
    [
      {
        id: uuidv1(),
        text: 'Lorem Ipsum is simply dummy text',
        type: 'received',
      },
      {
        id: uuidv1(),
        text: 'Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        type: 'sent',
      },
      {
        id: uuidv1(),
        text: 'Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        type: 'received',
      },
    ],
    [
      {
        id: uuidv1(),
        text: 'It is a long established fact that a reader will be distracted by the readable content',
        type: 'received',
      },
      {
        id: uuidv1(),
        text: 'has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        type: 'sent',
      },
      {
        id: uuidv1(),
        text: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below',
        type: 'sent',
      },
      {
        id: uuidv1(),
        text: 'Lorem Ipsum is simply dummy text',
        type: 'received',
      },
      { id: uuidv1(), text: 'Lorem Ipsum is simply dummy text', type: 'received' },
      {
        id: uuidv1(),
        text: 'It is a long established fact that a reader will be distracted by the readable content',
        type: 'received',
      },
      {
        id: uuidv1(),
        text: 'with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        type: 'sent',
      },
      {
        id: uuidv1(),
        text: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below',
        type: 'sent',
      },
      {
        id: uuidv1(),
        text: 'Lorem Ipsum is simply dummy text',
        type: 'sent',
      },
      {
        id: uuidv1(),
        text: 'Lorem Ipsum is simply dummy text',
        type: 'sent',
      },
    ],
    [
      { id: uuidv1(), text: 'Where does it come from?', type: 'received' },
      {
        id: uuidv1(),
        text: '"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        type: 'sent',
      },
      { id: uuidv1(), text: 'Lorem Ipsum', type: 'received' },
      { id: uuidv1(), text: 'Lorem Ipsum', type: 'sent' },
      {
        id: uuidv1(),
        text: 'Lorem Ipsum used since the 1500s is reproduced below',
        type: 'sent',
      },
    ],
    [
      {
        id: uuidv1(),
        text: 'Lorem Ipsum used since the 1500s is reproduced below',
        type: 'received',
      },
      {
        id: uuidv1(),
        text: '"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. ',
        type: 'sent',
      },
      {
        id: uuidv1(),
        text: 'Lorem Ipsum',
        type: 'received',
      },
      { id: uuidv1(), text: 'Lorem Ipsum is simply dummy text', type: 'sent' },
    ],
  ] as UserMessage[][],
  storedMessages: [] as string[],
}

export type DialogsReducerState = typeof initialState

type DialogAction = InferAction<typeof dialogsActions>

const dialogsReducer = (state = initialState, action: DialogAction): DialogsReducerState => {
  switch (action.type) {
    case 'IN_LINK/DIALOGS_REDUCER/SEND_MESSAGE':
      if (action.text) {
        return {
          ...state,
          userMessages: state.userMessages.map((messages, conversationIndex) => {
            if (conversationIndex === action.to)
              messages.push({
                id: uuidv1(),
                text: action.text,
                type: 'sent',
              })
            return messages
          }),
        }
      }
      return {
        ...state,
      }

    case 'IN_LINK/DIALOGS_REDUCER/DELETE_MESSAGE':
      return {
        ...state,
        userMessages: state.userMessages.map((messages) => {
          return messages.filter((message) => message.id !== action.messageId)
        }),
      }

    case 'IN_LINK/DIALOGS_REDUCER/EDIT_MESSAGE':
      return {
        ...state,
        userMessages: state.userMessages.map((messages) => {
          return updateObjInArr(messages, 'id', action.messageId, {
            text: action.text,
          })
        }),
      }

    case 'IN_LINK/DIALOGS_REDUCER/STORE_MESSAGE':
      return {
        ...state,
        storedMessages: [
          ...state.storedMessages.map((message, index) => {
            return action.index === index ? action.message : message
          }),
        ],
      }
    case 'IN_LINK/DIALOGS_REDUCER/INITIALIZE_STORED_MESSAGES':
      return {
        ...state,
        storedMessages: action.length ? new Array(action.length).fill('') : [],
      }
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

  deleteMessage: (messageId: string) =>
    ({
      type: 'IN_LINK/DIALOGS_REDUCER/DELETE_MESSAGE',
      messageId,
    } as const),

  editMessage: (messageId: string, text: string) =>
    ({
      type: 'IN_LINK/DIALOGS_REDUCER/EDIT_MESSAGE',
      messageId,
      text,
    } as const),

  storeMessage: (message: string, index: number) =>
    ({
      type: 'IN_LINK/DIALOGS_REDUCER/STORE_MESSAGE',
      message,
      index,
    } as const),
  initializeStoredMessages: (length: number) =>
    ({
      type: 'IN_LINK/DIALOGS_REDUCER/INITIALIZE_STORED_MESSAGES',
      length,
    } as const),
}

export default dialogsReducer
