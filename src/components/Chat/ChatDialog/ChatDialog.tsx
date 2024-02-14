import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import {
  chatActions,
  startMessagesListening,
  stopMessagesListening,
} from '@/redux/chat-reducer/chat-reducer'

import { getChatOpen } from '@/redux/chat-reducer/chat-selector'
import BaseDialog from '@/components/common/Dialogs/BaseDialog/BaseDialog'
import ChatStatus from '../ChatStatus/ChatStatus'
import Messages from '../Messages/Messages'
import PostText from '../PostText/PostText'
import { useLocation } from 'react-router-dom'

const ChatDialog = () => {
  const [pathname, setPathname] = useState(useLocation().pathname)
  const location = useLocation()
  const chatOpen = useAppSelector(getChatOpen)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (location.pathname !== pathname) {
      dispatch(chatActions.setChatOpen(false))
      setPathname(location.pathname)
    }
  }, [pathname, location.pathname, dispatch])

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [dispatch])

  return (
    <BaseDialog
      isShown={chatOpen}
      onClose={() => {
        dispatch(chatActions.setChatOpen(false))
      }}
      customFooter={
        <div className='w-full'>
          <PostText />
        </div>
      }
    >
      <ChatStatus />
      <div
        className='w-[600px] h-[90vh]
      font-semibold
      overflow-y-scroll overflow-x-hidden
      px-8'
      >
        <Messages />
      </div>
    </BaseDialog>
  )
}

export default ChatDialog
