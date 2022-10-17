import { FC } from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { getMessages } from '../../../redux/chat-reducer/chat-selector'

const Messages = () => {
	const messages = useAppSelector(getMessages)

	return (
		<div>
			{messages?.map(({ message, userName }) => {
				return (
					<div className='bg-green-100 p-3 m-2' key={userName + message + Math.random()}>
						{userName}: {message}
					</div>
				)
			})}
		</div>
	)
}

export default Messages
