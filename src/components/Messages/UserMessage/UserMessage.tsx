import React, { FC, useState } from 'react'
import cn from 'classnames'
import { useDispatch } from 'react-redux'

import { User, UserMessage as UserMessageType } from '../../../types/types'
import Placeholder from '../../../assets/pfps/placeholder.jpg'
import EditOptions from '../../common/Dropdown/EditOptions/EditOptions'
import EditText, { EditTextButtonColor } from '../../common/Inputs/EditText/EditText'
import { dialogsActions } from '../../../redux/dialogs-reducer/dialogs-reducer'
import { NavLink } from 'react-router-dom'
import ConfirmDialog from '../../common/Dialogs/ConfirmDialog/ConfirmDialog'

type UserMessageProps = {
  message: UserMessageType
  index: number
  array: UserMessageType[]

  conversationIndex: number
  users: User[]
}

const UserMessage: FC<UserMessageProps> = ({
  message: { type, text, id },
  index,
  array,
  conversationIndex,
  users,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const dispatch = useDispatch()

  const previous = array[index - 1]
  const next = array[index + 1]

  return (
    <div
      className={cn('flex items-end font-normal relative', {
        'justify-end mr-3': type === 'sent',
        'ml-3': type === 'received',
      })}
    >
      <ConfirmDialog
        isShown={confirmDelete}
        onClose={() => {
          setConfirmDelete(false)
        }}
        onSubmit={() => {
          dispatch(dialogsActions.deleteMessage(id))
          setConfirmDelete(false)
        }}
        confirmText='Are you sure you want to delete this message?'
      ></ConfirmDialog>

      {type === 'received' && next?.type === 'sent' && (
        <NavLink
          to={
            '/profile/' +
            (type === 'received'
              ? users[conversationIndex].uniqueUrlName || users[conversationIndex].id
              : '')
          }
          className='w-12 absolute -bottom-1'
        >
          <img
            src={users[conversationIndex].photos.small || Placeholder}
            alt={users[conversationIndex].name}
            className='h-10 w-10 rounded-full'
          />
        </NavLink>
      )}

      <div
        className={cn('flex max-w-[85%]', {
          'mr-12': type === 'sent',
          'ml-12': type === 'received',
        })}
      >
        {!isEditing && (
          <div
            className={cn('mx-1', {
              'order-first': type === 'sent',
              'order-last': type === 'received',
            })}
          >
            <EditOptions
              onEdit={() => {
                setIsEditing(true)
              }}
              onDelete={() => {
                setConfirmDelete(true)
              }}
              absolutePosition='left-0'
              canEdit={type === 'sent'}
            />
          </div>
        )}

        <div
          className={cn('px-4 py-1 text-white', {
            'order-2 bg-gray-400 rounded-r-3xl': type === 'received',
            'order-1 bg-blue-400 rounded-l-3xl': type === 'sent',

            'rounded-tl-3xl': type === 'received' && (!previous || previous.type === 'sent'),
            'rounded-tr-3xl': type === 'sent' && (!previous || previous.type === 'received'),

            'rounded-bl': type === 'received' && next?.type === 'received',
            'rounded-tl': type === 'received' && previous?.type === 'received',
            'rounded-br': type === 'sent' && next?.type === 'sent',
            'rounded-tr': type === 'sent' && previous?.type === 'sent',
          })}
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
              textAreaClassName='h-20'
              buttonsColor={EditTextButtonColor.Blue}
            />
          ) : (
            <>{text}</>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserMessage
