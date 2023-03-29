import { RootState } from '../store'

export const getMessages = (state: RootState) => {
  return state.chat.messages
}

export const getStatus = (state: RootState) => {
  return state.chat.status
}

export const getChatOpen = (state: RootState) => {
  return state.chat.chatOpen
}
