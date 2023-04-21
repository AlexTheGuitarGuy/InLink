import { getIsLoggedIn } from 'redux/auth-reducer/auth-selector'
import { getChatOpen } from 'redux/chat-reducer/chat-selector'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { chatActions } from '../../redux/chat-reducer/chat-reducer'
import Chat from './Chat/Chat'
import ChatShortcut from './ChatShortcut/ChatShortcut'

const ChatFunctionality = () => {
  const chatOpen = useAppSelector(getChatOpen)
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const dispatch = useAppDispatch()

  return (
    <>
      {isLoggedIn && <ChatShortcut onOpen={() => dispatch(chatActions.setChatOpen(true))} />}
      {chatOpen && <Chat />}
    </>
  )
}

export default ChatFunctionality
