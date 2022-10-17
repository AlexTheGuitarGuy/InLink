import { FC, useEffect, useRef } from 'react'
import { v1 as uuidv1 } from 'uuid'

import { useAppSelector } from '../../../hooks/reduxHooks'
import { getMessages } from '../../../redux/chat-reducer/chat-selector'
import useScreenSize from '../../../hooks/useScreenSize'

const Messages = () => {
	const messages = useAppSelector(getMessages)

	const bottomRef = useRef<HTMLDivElement>(null)

	const { dynamicHeight } = useScreenSize()

	useEffect(() => {
		const distanceFromTop = bottomRef.current?.getBoundingClientRect().top
		const screenAlignment = distanceFromTop && distanceFromTop - dynamicHeight
		const scrollRange = dynamicHeight / 8
		if (screenAlignment && screenAlignment < scrollRange && screenAlignment > -scrollRange)
			bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages, dynamicHeight])

	return (
		<div>
			{messages?.map(({ message, userName }) => {
				return (
					<div className='bg-green-100 p-3 m-2' key={uuidv1()}>
						{userName}: {message}
					</div>
				)
			})}
			<div ref={bottomRef}></div>
		</div>
	)
}

export default Messages
