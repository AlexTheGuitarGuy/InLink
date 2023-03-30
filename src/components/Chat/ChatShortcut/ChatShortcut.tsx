import { ChatBubble } from '@mui/icons-material'
import { animated, useSpring } from 'react-spring'

import useScreenSize from '../../../hooks/useScreenSize'
import { useGesture } from 'react-use-gesture'
import cn from 'classnames'
import { FC, useState } from 'react'

type ChatShortcutProps = {
  onOpen: () => void
}

const ChatShortcut: FC<ChatShortcutProps> = ({ onOpen }) => {
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
        onOpen && onOpen()
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
                    text-white bg-primary
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
