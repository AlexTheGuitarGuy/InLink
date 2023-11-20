import cn from 'classnames'
import { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'

import Placeholder from '../../../../assets/pfps/placeholder.jpg'
import ConfirmDialog from '../../Dialogs/ConfirmDialog/ConfirmDialog'
import EditOptions from '../../Dropdowns/EditOptions/EditOptions'
import EditText, { EditTextButtonColor } from '../../Inputs/EditText/EditText'

type UserMessageProps = {
  message: string
  userName: string
  userPhoto: string | null
  userProfileLink: string
  isFromMe: boolean
  isNextFromSameUser: boolean
  isPreviousFromSameUser: boolean
  isFirst: boolean
  isLast: boolean
  onEdit: (text: string) => void
  onDelete: () => void
  isPending?: boolean
}

const UserMessage: FC<UserMessageProps> = ({
  message,
  userName,
  userPhoto,
  userProfileLink,
  isFromMe,
  isNextFromSameUser,
  isPreviousFromSameUser,
  isFirst,
  isLast,
  onEdit,
  onDelete,
  isPending,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [showEditOptions, setShowEditOptions] = useState(false)
  const [isEditOptionsMenuOpen, setIsEditOptionsMenuOpen] = useState(false)

  return (
    <div
      className={cn('flex font-normal', {
        'justify-end': isFromMe,
      })}
      onMouseEnter={() => {
        setShowEditOptions(true)
      }}
      onMouseLeave={() => {
        setShowEditOptions(false)
      }}
    >
      <ConfirmDialog
        isShown={confirmDelete}
        onClose={() => {
          setConfirmDelete(false)
        }}
        onSubmit={() => {
          setConfirmDelete(false)
          onDelete()
        }}
        confirmText='Are you sure you want to delete this message?'
      ></ConfirmDialog>

      <div
        className={cn('flex max-w-[85%] relative', {
          'ml-12': !isFromMe,
          'mt-3': !isPreviousFromSameUser,
        })}
      >
        {!isFromMe && (!isNextFromSameUser || isLast) && (
          <NavLink to={userProfileLink} className='w-12 absolute -left-12 -bottom-2'>
            <img src={userPhoto || Placeholder} alt={userName} className='h-10 w-10 rounded-full' />
          </NavLink>
        )}

        {!isEditing && !isPending && (
          <div
            className={cn('mx-1 transition-opacity', {
              'order-first': isFromMe,
              'order-last': !isFromMe,
              'opacity-100': showEditOptions || isEditOptionsMenuOpen,
              'opacity-0': !showEditOptions && !isEditOptionsMenuOpen,
            })}
          >
            <EditOptions
              onEdit={() => {
                setIsEditing(true)
              }}
              onDelete={() => {
                setConfirmDelete(true)
              }}
              onToggleMenu={(open) => {
                setIsEditOptionsMenuOpen(open)
              }}
              absolutePosition='left-0'
              canEdit={isFromMe}
            />
          </div>
        )}

        <div
          className={cn('px-4 py-1 font-medium break-words', {
            'order-2 bg-neutralChild rounded-r-3xl': !isFromMe,
            'order-1 bg-primaryBg rounded-l-3xl text-gray-100': isFromMe,
            'opacity-50': isPending,

            'rounded-tl-3xl': !isFromMe && (isFirst || !isPreviousFromSameUser),
            'rounded-tr-3xl': isFromMe && (isFirst || !isPreviousFromSameUser),

            'rounded-tl-md': !isFromMe && isPreviousFromSameUser,
            'rounded-bl-md': !isFromMe && isNextFromSameUser,
            'rounded-tr-md': isFromMe && isPreviousFromSameUser,
            'rounded-br-md': isFromMe && isNextFromSameUser,

            'w-[70vw]': isEditing,
          })}
        >
          {!isFromMe && !isPreviousFromSameUser && (
            <NavLink to={userProfileLink} className='text-sm font-semibold block'>
              {userName}
            </NavLink>
          )}
          {isEditing ? (
            <EditText
              text={message}
              onDone={(resultText) => {
                setIsEditing(false)
                onEdit(resultText)
              }}
              onClear={() => {
                setIsEditing(false)
              }}
              textAreaClassName='h-20 w-full bg-primaryBg'
              buttonsColor={EditTextButtonColor.PRIMARY}
            />
          ) : (
            <>{message}</>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserMessage
