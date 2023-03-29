import React, { useEffect } from 'react'

import {
  chatActions,
  startMessagesListening,
  stopMessagesListening,
} from '../../../redux/chat-reducer/chat-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'

import Messages from '../Messages/Messages'
import BaseDialog from '../../common/Dialogs/BaseDialog/BaseDialog'
import PostText from '../PostText/PostText'
import ChatStatus from '../ChatStatus/ChatStatus'
import { getChatOpen } from '../../../redux/chat-reducer/chat-selector'

const Chat = () => {
  const chatOpen = useAppSelector(getChatOpen)

  const dispatch = useAppDispatch()

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
        className='w-[80vw] lg:w-[60vw] h-[90vh]
      text-gray-700 bg-gray-100 font-semibold 
      overflow-y-scroll overflow-x-hidden
      px-8'
      >
        <Messages />
      </div>
    </BaseDialog>
  )
}

export default Chat
