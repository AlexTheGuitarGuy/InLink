import { ChatBubble } from '@mui/icons-material'
import { animated, useSpring } from 'react-spring'

import useScreenSize from '../../../hooks/useScreenSize'
import { useGesture } from 'react-use-gesture'
import { chatActions } from '../../../redux/chat-reducer/chat-reducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import cn from 'classnames'
import { useState } from 'react'
import { getChatOpen } from '../../../redux/chat-reducer/chat-selector'

const ChatShortcut = () => {
  const dispatch = useAppDispatch()

  const chatOpen = useAppSelector(getChatOpen)

  const screenSize = useScreenSize()
  const startHeight = 100
  const startWidth = screenSize.dynamicWidth - 80

  const [isDragging, setIsDragging] = useState(false)

  const [{ x, y }, api] = useSpring(() => ({
    x: startWidth,
    y: startHeight,
  }))

  const bind = useGesture(
    {
      onDragStart: () => {
        setIsDragging(true)
      },
      onDragEnd: () => {
        setIsDragging(false)
      },
      onDrag: ({ movement: [mx, my] }) => {
        api.start({ x: mx, y: my, immediate: true })
      },
      onMouseUp: () => {
        let newX: number
        let newY = y.get()
        if (y.get() < 0) newY = 0
        else if (y.get() > screenSize.dynamicHeight - 150) newY = screenSize.dynamicHeight - 150

        if (x.get() < screenSize.dynamicWidth / 2) newX = 0
        else newX = startWidth

        api.start({ x: newX, y: newY })
      },
      onClick: () => {
        api.start({ x: startWidth, y: startHeight })
        dispatch(chatActions.setChatOpen(!chatOpen))
      },
    },
    {
      drag: {
        initial: () => [x.get(), y.get()],
        filterTaps: true,
        rubberband: 10,
      },
    },
  )

  return (
    <div
      className={cn(
        'fixed h-screen w-screen pointer-events-none z-40 opacity-100 transition-all scale-100',
        {
          'opacity-70 scale-95': isDragging,
        },
      )}
    >
      <animated.button
        className='pointer-events-auto
                    bottom-0 right-0
                    w-16 h-16
                    rounded-full
                    bg-blue-700 text-white
                    flex justify-center items-center'
        style={{ x, y }}
        {...bind()}
      >
        <ChatBubble fontSize='large' />
      </animated.button>
    </div>
  )
}

export default ChatShortcut
