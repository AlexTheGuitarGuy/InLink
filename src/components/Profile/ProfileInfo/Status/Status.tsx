import React, { useEffect, useState, ChangeEvent, FC } from 'react'
import cn from 'classnames'

import { updateStatus } from '../../../../redux/profile-reducer/profile-reducer'
import { getStatus } from '../../../../redux/profile-reducer/profile-selector'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'

type StatusProps = {
  isOwner: boolean
}
const Status: FC<StatusProps> = ({ isOwner }) => {
  const status = useAppSelector(getStatus)

  const dispatch = useAppDispatch()

  const [isEditing, setEditing] = useState(false)
  const [localStatus, setStatus] = useState(status)

  const activateEdit = () => {
    if (isOwner) setEditing(true)
  }

  const deactivateEdit = () => {
    setEditing(false)
    dispatch(updateStatus(localStatus))
  }

  const editLocalStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value)
  }

  useEffect(() => {
    setStatus(status)
  }, [status])

  return (
    <div className='inline transition-colors break-words xl:text-xl'>
      {!isEditing ? (
        <div
          onClick={activateEdit}
          className={cn(`p-1 rounded max-w-sm`, {
            'hover:bg-gray-200 cursor-pointer': isOwner,
          })}
        >
          {status ? '"' + status + '"' : 'No status'}
        </div>
      ) : (
        <div>
          <input
            onChange={editLocalStatus}
            className='p-1 lg:pl-2.5 rounded
            font-semibold text-gray-700
            border border-gray-300
            focus:outline-none focus:border-gray-500
            transition sm:text-center lg:text-left'
            autoFocus={true}
            onBlur={deactivateEdit}
            defaultValue={localStatus}
          />
        </div>
      )}
    </div>
  )
}

export default Status
