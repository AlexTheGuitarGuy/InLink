import { useEffect, useRef } from 'react'
import { v1 as uuidv1 } from 'uuid'

import { useAppSelector } from '../../../hooks/reduxHooks'
import { getMessages, getStatus } from '../../../redux/chat-reducer/chat-selector'
import { getUID } from '../../../redux/auth-reducer/auth-selector'
import useScreenSize from '../../../hooks/useScreenSize'
import { NavLink } from 'react-router-dom'
import placeholder from '../../../assets/pfps/placeholder.jpg'
import cn from 'classnames'

const Messages = () => {
  const messages = useAppSelector(getMessages)
  const status = useAppSelector(getStatus)
  const myUID = useAppSelector(getUID)

  const bottomRef = useRef<HTMLDivElement>(null)

  const { dynamicHeight } = useScreenSize()

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 1000)
  }, [status])

  useEffect(() => {
    const distanceFromTop = bottomRef.current?.getBoundingClientRect().top
    const screenAlignment = distanceFromTop && distanceFromTop - dynamicHeight
    const scrollRange = dynamicHeight / 8
    if (screenAlignment && screenAlignment < scrollRange && screenAlignment > -scrollRange)
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, dynamicHeight])

  return (
    <div>
      {messages?.map(({ message, userName, userId, photo }) => {
        const isThisMe = myUID === userId
        return (
          <div
            className={cn('p-3 m-2 rounded-lg border-y lg:border border-gray-300 lg:bg-gray-200', {
              'flex flex-col items-end': isThisMe,
            })}
            key={uuidv1()}
          >
            <div className='w-fit'>
              <NavLink to={`/profile/${userId}`}>
                <div className='flex items-center'>
                  <img
                    src={photo || placeholder}
                    className={cn(
                      `h-16 w-16 p-0.5 mr-2
                    rounded-full
                    inline
                    transition-colors hover:bg-gray-700 active:bg-gray-800`,
                      { 'order-last': isThisMe },
                    )}
                    alt='user'
                  />
                  <span className='hover:underline font-bold mx-2'>{userName}</span>
                </div>
              </NavLink>
            </div>
            <div
              className={cn('my-2 break-all', {
                'flex justify-end': isThisMe,
              })}
            >
              {message}
            </div>
          </div>
        )
      })}
      <div ref={bottomRef}></div>
    </div>
  )
}

export default Messages
