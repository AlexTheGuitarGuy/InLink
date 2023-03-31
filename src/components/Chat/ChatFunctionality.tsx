import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getIsLoggedIn } from '../../redux/auth-reducer/auth-selector'
import { chatActions } from '../../redux/chat-reducer/chat-reducer'
import Chat from './Chat/Chat'
import ChatShortcut from './ChatShortcut/ChatShortcut'

const ChatFunctionality = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn)

  const dispatch = useAppDispatch()

  return (
    <>
      {isLoggedIn && <ChatShortcut onOpen={() => dispatch(chatActions.setChatOpen(true))} />}
      <Chat />
    </>
  )
}

export default ChatFunctionality
