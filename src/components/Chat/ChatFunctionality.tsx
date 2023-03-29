import ChatShortcut from './ChatShortcut/ChatShortcut'
import Chat from './Chat/Chat'
import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import { getIsLoggedIn } from '../../redux/auth-reducer/auth-selector'

const ChatFunctionality = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn)

  return (
    <>
      {isLoggedIn && <ChatShortcut />} <Chat />
    </>
  )
}

export default ChatFunctionality
