import { RootState } from '../redux-store'

export const getMessages = (state: RootState) => {
	return state.chat.messages
}

export const getStatus = (state: RootState) => {
	return state.chat.status
}
