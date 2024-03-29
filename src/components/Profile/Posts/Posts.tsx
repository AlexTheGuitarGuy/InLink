import { FC } from 'react'

import placeholder from '@/assets/pfps/placeholder.jpg'
import { getPosts } from '@/redux/profile-reducer/profile-selector'
import { Post } from '@/types'

import PostCard from './PostCard/PostCard'
import PublishPost from './PublishPost/PublishPost'
import { useAppSelector } from '@/hooks/reduxHooks'

type MyPostsProps = {
  pfp: string
  isOwner: boolean
  userName: string
}

const Posts: FC<MyPostsProps> = ({ pfp, isOwner, userName }) => {
  const posts = useAppSelector(getPosts)

  let postElements = posts.map((postData: Post) => (
    <PostCard
      key={postData.id}
      postData={postData}
      pfp={pfp || placeholder}
      userName={userName}
      isOwner={isOwner}
    />
  ))

  return (
    <div
      className='flex flex-col justify-between
      lg:bg-neutralBg lg:rounded-lg lg:p-8
      sm:pt-4 lg:mt-4
      sm:mx-4 lg:mx-0
      font-semibold

      lg:border-none

      sm:border-t-2 sm:border-neutralFocus
      min-h-[80vh]
    '
    >
      <div className='lg:w-3/4 sm:w-full mx-auto'>
        {isOwner && <PublishPost />}
        <div className='mt-4'>{postElements.reverse()}</div>
      </div>
    </div>
  )
}

export default Posts
