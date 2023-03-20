import { RootState } from '../store'

export const getDialogsPage = (state: RootState) => {
  return state.dialogsPage
}

export const getUserMessages = (state: RootState) => {
  return getDialogsPage(state).userMessages
}

export const getStoredMessages = (state: RootState) => {
  return getDialogsPage(state).storedMessages
}
