import React, { FC } from 'react'
import LikeIcon from '../../../../assets/like.jpg'

type PostCardProps = {
  text: string
  likes: number
  pfp: string
  userName: string
}

const PostCard: FC<PostCardProps> = ({ text, likes, pfp, userName }) => {
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
        <div className='mt-2'>
          <img
            src={LikeIcon}
            alt='likes'
            className='w-4 h-4
              xl:w-6 xl:h-6
             mb-1 mr-1.5
             xl:mb-3
             inline'
          />
          {likes}
        </div>
      </div>
    </div>
  )
}

export default PostCard
