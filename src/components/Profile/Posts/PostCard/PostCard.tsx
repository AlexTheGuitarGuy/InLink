import { ThumbUpOffAlt, ThumbUpAlt } from '@mui/icons-material'
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

import { profileActions } from '../../../../redux/profile-reducer/profile-reducer'
import { Post } from '../../../../types/types'
import EditOptions from '../../../common/Dropdown/EditOptions/EditOptions'
import EditText from '../../../common/Inputs/EditText/EditText'
import ConfirmDialog from '../../../common/Dialogs/ConfirmDialog/ConfirmDialog'

type PostCardProps = {
  postData: Post
  pfp: string
  userName: string
  isOwner: boolean
}

const PostCard: FC<PostCardProps> = ({
  postData: { id, likes, text, likedByUser },
  pfp,
  userName,
  isOwner,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const dispatch = useDispatch()

  return (
    <div className='mt-4 flex flex-col lg:text-l sm:text-sm'>
      {/* Dialogs */}
      <ConfirmDialog
        isShown={confirmDelete}
        onClose={() => {
          setConfirmDelete(false)
        }}
        onSubmit={() => {
          dispatch(profileActions.deletePost(id))
          setConfirmDelete(false)
        }}
        confirmText='Are you sure you want to delete this post?'
      ></ConfirmDialog>

      {/* Header */}
      <div
        className='order-1 p-4
      border border-onPrimaryBg
      bg-primaryBg
      rounded-tl rounded-tr
      flex justify-between'
      >
        {/* User Data */}
        <div>
          <img
            src={pfp}
            alt='poster_pfp'
            className='rounded-full
                      w-10 h-10
                      xl:w-16 xl:h-16
                      bg-neutralFocus
                      p-0.5 inline'
          />
          <span className='ml-2'>{userName}</span>
        </div>

        {/* Options */}
        {isOwner && !isEditing && (
          <EditOptions
            onEdit={() => setIsEditing(true)}
            onDelete={() => {
              setConfirmDelete(true)
            }}
          />
        )}
      </div>

      {/* Body */}
      <div
        className='order-2 p-4
                    border border-t-0 border-onNeutralBg
                    bg-neutralChild
                    rounded-bl rounded-br
                    flex flex-col'
      >
        {isEditing ? (
          <EditText
            text={text}
            onDone={(resultText: string) => {
              dispatch(profileActions.editPost(id, resultText))
              setIsEditing(false)
            }}
            onClear={() => setIsEditing(false)}
            textAreaClassName='w-full text-center'
          />
        ) : (
          <div className='text-center mt-2 break-words'>{text}</div>
        )}
        <button
          className='mt-2 items-center cursor-pointer w-fit'
          onClick={() => dispatch(profileActions.triggerLike(id))}
        >
          {likedByUser ? (
            <ThumbUpAlt className='mr-1 mb-0.5' />
          ) : (
            <ThumbUpOffAlt className='mr-1 mb-0.5' />
          )}
          {likes}
        </button>
      </div>
    </div>
  )
}

export default PostCard
