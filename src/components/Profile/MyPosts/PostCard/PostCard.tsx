import { ThumbUpOffAlt, ThumbUpAlt } from '@mui/icons-material'

import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { profileActions } from '../../../../redux/profile-reducer/profile-reducer'
import { Post } from '../../../../types/types'

type PostCardProps = {
  postData: Post
  pfp: string
  userName: string
}

const PostCard: FC<PostCardProps> = ({
  postData: { id, likes, text, likedByUser },
  pfp,
  userName,
}) => {
  const dispatch = useDispatch()

  const triggerLike = () => {
    dispatch(profileActions.triggerLike(id))
  }

  return (
    <div className='mt-4 flex flex-col lg:text-l sm:text-sm'>
      <div
        className='order-1 p-4
      border-x border-t border-gray-300
      rounded-tl rounded-tr
      bg-gray-100 text-gray-700 '
      >
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

      <div
        className='order-2 p-4
                    border border-gray-300
                    rounded-bl rounded-br
                    bg-gray-200
                    text-gray-700 
                    font-semibold'
      >
        <div className='text-center mt-2 break-words'>{text}</div>
        <button className='mt-2 items-center cursor-pointer' onClick={triggerLike}>
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
