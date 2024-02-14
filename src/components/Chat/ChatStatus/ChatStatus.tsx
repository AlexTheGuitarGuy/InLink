import cn from 'classnames'
import { useEffect, useState } from 'react'
import { Status } from '../../../api/chatAPI'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { getStatus } from '../../../redux/chat-reducer/chat-selector'
import Loading, { Dimensions } from '../../common/Loading/Loading'

const ChatStatus = () => {
  const status = useAppSelector(getStatus)

  const [showSuccess, setShowSuccess] = useState(status !== Status.READY)

  useEffect(() => {
    const timeout = setTimeout(() => setShowSuccess(false), 5000)
    return () => {
      clearTimeout(timeout)
    }
  }, [status])

  const isReady = status === Status.READY
  const isPending = status === Status.PENDING
  const isError = status === Status.ERROR

  if (isReady && !showSuccess) return <></>

  return (
    <div
      className={cn(
        `w-fit
              absolute right-4 top-16
              text-gray-100
              p-2 my-2
              font-normal
              rounded border
              z-50`,
        { 'bg-onPrimaryBg border-onPrimaryBg': isReady },
        { 'bg-yellow-100 border-yellow-200 text-gray-400': isPending },
        { 'bg-red-100 border-red-200': isError },
      )}
    >
      {isReady && 'Connected.'}
      {isPending && (
        <div className='flex space-x-3'>
          <div>Connecting...</div>
          <Loading dimensions={Dimensions.SMALL} />
        </div>
      )}
      {isError && 'An error has occurred.'}
    </div>
  )
}

export default ChatStatus
