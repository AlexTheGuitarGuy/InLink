import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import {
  chatActions,
  startMessagesListening,
  stopMessagesListening,
} from '../../../redux/chat-reducer/chat-reducer'

import { getChatOpen } from '../../../redux/chat-reducer/chat-selector'
import BaseDialog from '../../common/Dialogs/BaseDialog/BaseDialog'
import ChatStatus from '../ChatStatus/ChatStatus'
import Messages from '../Messages/Messages'
import PostText from '../PostText/PostText'

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
        className='w-[90vw]
      bg-neutralBg font-semibold
      overflow-y-scroll overflow-x-hidden
      px-8'
      >
        <Messages />
      </div>
    </BaseDialog>
  )
}

export default Chat
