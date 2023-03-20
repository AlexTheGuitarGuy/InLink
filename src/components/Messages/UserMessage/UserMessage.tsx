import React, { FC, useState } from 'react'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { getMyData } from '../../../redux/profile-reducer/profile-selector'
import { User, UserMessage as UserMessageType } from '../../../types/types'
import Placeholder from '../../../assets/pfps/placeholder.jpg'
import EditOptions from '../../common/Menu/EditOptions/EditOptions'
import EditText, { EditTextButtonColor } from '../../common/Inputs/EditText/EditText'
import { dialogsActions } from '../../../redux/dialogs-reducer/dialogs-reducer'
import { NavLink } from 'react-router-dom'

type UserMessageProps = {
  message: UserMessageType
  conversationIndex: number
  users: User[]
}

const UserMessage: FC<UserMessageProps> = ({
  message: { type, text, id },
  conversationIndex,
  users,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()
  const myData = useSelector(getMyData)

  const isFromMe = type === 'sent'

  return (
    <div
      className={cn(
        'flex font-normal mt-8',
        {
          'justify-end ml-8': isFromMe,
        },
        { 'mr-8': !isFromMe },
      )}
    >
      {!isEditing && (
        <div className={cn('mt-2 mx-1', { 'order-first': isFromMe }, { 'order-last': !isFromMe })}>
          <EditOptions
            onEdit={() => {
              setIsEditing(true)
            }}
            onDelete={() => {
              dispatch(dialogsActions.deleteMessage(id))
            }}
            absolutePosition='left-0'
            canEdit={isFromMe}
          />
        </div>
      )}
      <NavLink
        to={
          '/profile/' +
          (!isFromMe ? users[conversationIndex].uniqueUrlName || users[conversationIndex].id : '')
        }
        className={cn('w-12', { 'order-1': !isFromMe }, { 'order-2': isFromMe })}
      >
        <img
          src={
            (isFromMe ? myData?.photos?.small : users[conversationIndex].photos.small) ||
            Placeholder
          }
          alt={users[conversationIndex].name}
          className='h-10 w-10 rounded-full'
        />
      </NavLink>

      <div
        className={cn(
          'mt-2 p-2 rounded-b-lg',
          {
            'ml-4 order-2 bg-gray-400 text-white rounded-r-lg': !isFromMe,
          },
          {
            'mr-4 order-1 bg-blue-400 text-white rounded-l-lg': isFromMe,
          },
          {
            'w-fit': !isEditing,
          },
          {
            'w-full': isEditing,
          },
        )}
      >
        {isEditing ? (
          <EditText
            text={text}
            onDone={(resultText) => {
              dispatch(dialogsActions.editMessage(id, resultText))
              setIsEditing(false)
            }}
            onClear={() => {
              setIsEditing(false)
            }}
            textAreaClassName='w-full h-20'
            buttonsColor={EditTextButtonColor.Blue}
          />
        ) : (
          <>{text}</>
        )}
      </div>
    </div>
  )
}

export default UserMessage
