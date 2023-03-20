import React, { FC } from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { getStatus } from '../../../redux/chat-reducer/chat-selector'
import cn from 'classnames'
import Loading, { Dimensions } from '../../common/Loading/Loading'

type ChatStatusProps = {
  showSuccess: boolean
}
const ChatStatus: FC<ChatStatusProps> = ({ showSuccess }) => {
  const status = useAppSelector(getStatus)

  const isReady = status === 'ready'
  const isPending = status === 'pending'
  const isError = status === 'error'

  if (isReady && !showSuccess) return <></>

  return (
    <div
      className={cn(
        `w-fit
              p-2 my-2
              font-normal
              rounded-lg border`,
        { 'bg-green-100 border-green-200': isReady },
        { 'bg-yellow-100 border-yellow-200': isPending },
        { 'bg-red-100 border-red-200': isError },
      )}
    >
      {isReady && 'Connected.'}
      {isPending && (
        <div className='flex space-x-3'>
          <Loading dimensions={Dimensions.small} />
          <div>Connecting...</div>
        </div>
      )}
      {isError && 'An error has occurred.'}
    </div>
  )
}

export default ChatStatus
