import { ThumbUpOffAlt, ThumbUpAlt } from '@mui/icons-material'
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

import { profileActions } from '../../../../redux/profile-reducer/profile-reducer'
import { Post } from '../../../../types/types'
import EditOptions from '../../../common/Menu/EditOptions/EditOptions'
import EditText from '../../../common/Inputs/EditText/EditText'

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

  const dispatch = useDispatch()

  return (
    <div className='mt-4 flex flex-col lg:text-l sm:text-sm'>
      {/* Header */}
      <div
        className='order-1 p-4
      border-x border-t border-gray-300
      rounded-tl rounded-tr
      bg-gray-100 text-gray-700
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
                      bg-gray-700
                      p-0.5 inline'
          />
          <span className='ml-2'>{userName}</span>
        </div>

        {/* Options */}
        {isOwner && !isEditing && (
          <EditOptions
            onEdit={() => setIsEditing(true)}
            onDelete={() => dispatch(profileActions.deletePost(id))}
          />
        )}
      </div>

      {/* Body */}
      <div
        className='order-2 p-4
                    border border-gray-300
                    rounded-bl rounded-br
                    bg-gray-200
                    text-gray-700
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
