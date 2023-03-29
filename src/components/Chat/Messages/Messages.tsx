import { useEffect, useRef } from 'react'
import { v1 as uuidv1 } from 'uuid'

import { useAppSelector } from '../../../hooks/reduxHooks'
import { getChatOpen, getMessages } from '../../../redux/chat-reducer/chat-selector'
import { getUID } from '../../../redux/auth-reducer/auth-selector'
import useScreenSize from '../../../hooks/useScreenSize'
import UserMessage from '../../common/Messages/UserMessage/UserMessage'

const Messages = () => {
  const messages = useAppSelector(getMessages)
  const myUID = useAppSelector(getUID)
  const chatOpen = useAppSelector(getChatOpen)

  const bottomRef = useRef<HTMLDivElement>(null)

  const { dynamicHeight } = useScreenSize()

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 1000)
  }, [chatOpen])

  useEffect(() => {
    const distanceFromTop = bottomRef.current?.getBoundingClientRect().top
    const screenAlignment = distanceFromTop && distanceFromTop - dynamicHeight
    const scrollRange = dynamicHeight / 8
    if (screenAlignment && screenAlignment < scrollRange && screenAlignment > -scrollRange)
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, dynamicHeight])

  return (
    <div className='space-y-0.5'>
      {messages?.map(({ message, userName, userId, photo, isPending }, index, array) => (
        <UserMessage
          key={uuidv1()}
          message={message}
          userName={userName}
          userPhoto={photo}
          userProfileLink={`/profile/${userId}`}
          isFromMe={myUID === userId}
          isNextFromSameUser={userId === array[index + 1]?.userId}
          isPreviousFromSameUser={userId === array[index - 1]?.userId}
          isFirst={index === 0}
          isLast={index === array.length - 1}
          onEdit={() => {}}
          onDelete={() => {}}
          isPending={isPending}
        />
      ))}
      <div ref={bottomRef}></div>
    </div>
  )
}

export default Messages
