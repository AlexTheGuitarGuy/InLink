import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { getStatus } from '../../../redux/chat-reducer/chat-selector'
import cn from 'classnames'
import Loading, { Dimensions } from '../../common/Loading/Loading'

const ChatStatus = () => {
  const status = useAppSelector(getStatus)

  const [showSuccess, setShowSuccess] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setShowSuccess(false), 5000)
    return () => {
      clearTimeout(timeout)
    }
  }, [status])

  const isReady = status === 'ready'
  const isPending = status === 'pending'
  const isError = status === 'error'

  if (isReady && !showSuccess) return <></>

  return (
    <div
      className={cn(
        `w-fit
              absolute right-4 top-16
              p-2 my-2
              font-normal
              rounded border
              z-50`,
        { 'bg-primaryBg border-onPrimaryBg': isReady },
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
