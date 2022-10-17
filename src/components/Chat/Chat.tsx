import { useEffect, useState } from 'react'

import {
	startMessagesListening,
	stopMessagesListening,
} from '../../redux/chat-reducer/chat-reducer'
import { getStatus } from '../../redux/chat-reducer/chat-selector'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import PostText from './PostText/PostText'
import Messages from './Messages/Messages'

const Chat = () => {
	const [showSuccess, setShowSuccess] = useState(true)

	const status = useAppSelector(getStatus)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(startMessagesListening())
		return () => {
			dispatch(stopMessagesListening())
		}
	}, [dispatch])

	useEffect(() => {
		const timeout = setTimeout(() => setShowSuccess(false), 5000)
		return () => {
			clearTimeout(timeout)
		}
	}, [status])

	return (
		<div
			className='lg:bg-gray-100 lg:rounded-lg 
						lg:p-8 sm:pt-4
				      	sm:mx-4 lg:mx-0
				      	text-gray-700 font-semibold 
						border-gray-300'
		>
			<Messages />
			<PostText />
			{status === 'error' && <div className='bg-red-100 font-normal'>An error has occured.</div>}
			{status === 'pending' && <div className='bg-yellow-100 font-normal'>Connecting...</div>}
			{status === 'ready' && showSuccess && (
				<div className='bg-green-100 font-normal'>Connected.</div>
			)}
		</div>
	)
}

export default Chat
