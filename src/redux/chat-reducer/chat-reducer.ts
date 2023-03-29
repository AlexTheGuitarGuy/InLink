import { InferAction, InferThunk, RootState } from '../store'
import {
  chatAPI,
  MessageData,
  MessageSubscriber,
  StatusSubscriber,
  Status,
} from '../../api/chatAPI'
import { Dispatch } from 'redux'

const initialState = {
  messages: null as MessageData[] | null,
  areMessagesInitialized: false,
  status: 'pending' as Status,
  chatOpen: false,
}

export type ChatReducerState = typeof initialState

type ChatAction = InferAction<typeof chatActions>

type ChatThunk = InferThunk<ChatAction>

const chatReducer = (state = initialState, action: ChatAction): ChatReducerState => {
  switch (action.type) {
    case 'IN_LINK/CHAT_REDUCER/MESSAGES_INITIALIZED':
    case 'IN_LINK/CHAT_REDUCER/STATUS_CHANGED':
    case 'IN_LINK/CHAT_REDUCER/SET_CHAT_OPEN':
      return {
        ...state,
        ...action.payload,
      }
    case 'IN_LINK/CHAT_REDUCER/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: state.messages?.length
          ? [...state.messages, ...action.messages]
          : [...action.messages],
      }
    case 'IN_LINK/CHAT_REDUCER/REMOVE_PENDING_MESSAGES':
      return {
        ...state,
        messages: state.messages?.filter((message) => !message.isPending) || [],
      }
    default:
      return state
  }
}

export const chatActions = {
  messagesReceived: (messages: MessageData[]) =>
    ({
      type: 'IN_LINK/CHAT_REDUCER/MESSAGES_RECEIVED',
      messages,
    } as const),
  messagesInitialized: (areMessagesInitialized: boolean) =>
    ({
      type: 'IN_LINK/CHAT_REDUCER/MESSAGES_INITIALIZED',
      payload: { areMessagesInitialized },
    } as const),
  statusChanged: (status: Status) =>
    ({
      type: 'IN_LINK/CHAT_REDUCER/STATUS_CHANGED',
      payload: { status },
    } as const),
  setChatOpen: (chatOpen: boolean) =>
    ({
      type: 'IN_LINK/CHAT_REDUCER/SET_CHAT_OPEN',
      payload: { chatOpen },
    } as const),

  removePendingMessages: () => ({ type: 'IN_LINK/CHAT_REDUCER/REMOVE_PENDING_MESSAGES' } as const),
}

let _newMessagesHandler: MessageSubscriber | null = null
const newMessagesHandlerCreator = (dispatch: Dispatch, getState: () => RootState) => {
  if (_newMessagesHandler === null)
    _newMessagesHandler = (messages: MessageData[]) => {
      const areMessagesInitialized = getState().chat.areMessagesInitialized
      const currentMessages = getState().chat.messages
      if ((messages.length > 1 && !areMessagesInitialized) || messages.length === 1) {
        dispatch(chatActions.messagesReceived(messages))
        dispatch(chatActions.messagesInitialized(true))
      } else if (
        messages.length > 1 &&
        areMessagesInitialized &&
        currentMessages?.length &&
        currentMessages.length < messages.length
      ) {
        dispatch(chatActions.messagesReceived(messages.slice(currentMessages.length)))
        dispatch(chatActions.messagesInitialized(true))
      }

      dispatch(chatActions.removePendingMessages())
    }

  return _newMessagesHandler as MessageSubscriber
}

let _newStatusHandler: StatusSubscriber | null = null
const newStatusHandlerCreator = (dispatch: Dispatch) => {
  if (_newStatusHandler === null)
    _newStatusHandler = (status: Status) => {
      dispatch(chatActions.statusChanged(status))
    }

  return _newStatusHandler as StatusSubscriber
}

export const startMessagesListening = (): ChatThunk => {
  return async (dispatch, getState) => {
    chatAPI.start()

    chatAPI.subscribe('message', newMessagesHandlerCreator(dispatch, getState))
    chatAPI.subscribe('status', newStatusHandlerCreator(dispatch))
  }
}

export const stopMessagesListening = (): ChatThunk => {
  return async (dispatch, getState) => {
    chatAPI.unsubscribe('message', newMessagesHandlerCreator(dispatch, getState))
    chatAPI.unsubscribe('status', newStatusHandlerCreator(dispatch))

    chatAPI.stop()
  }
}

export const sendMessage = (message: string): ChatThunk => {
  return async (dispatch, getState) => {
    const myData = getState().profilePage.myData
    dispatch(
      chatActions.messagesReceived([
        {
          userId: myData?.userId || 0,
          userName: myData?.fullName || '',
          photo: myData?.photos.small || '',
          message,
          isPending: true,
        },
      ]),
    )
    chatAPI.sendMessage(message)
  }
}

export default chatReducer
