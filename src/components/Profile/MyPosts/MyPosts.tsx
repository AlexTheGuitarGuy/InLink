import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import placeholder from '../../../assets/pfps/placeholder.jpg';
import { getPosts } from '../../../redux/profile-reducer/profile-selector';
import { Post } from '../../../types/types';

import PostCard from './PostCard/PostCard';
import PublishPost from './PublishPost/PublishPost';

type MyPostsProps = {
  pfp: string;
  isOwner: boolean;
  userName: string;
};

const MyPosts: FC<MyPostsProps> = ({ pfp, isOwner, userName }) => {
  const posts = useSelector(getPosts);

  const postElements = posts.map(({ id, text, likes }: Post) => (
    <PostCard key={id} text={text} likes={likes} pfp={pfp || placeholder} userName={userName} />
  ));

  return (
    <div
      className="flex flex-col justify-between
      lg:bg-gray-100 lg:rounded-lg lg:p-8 
      sm:pt-4 lg:mt-4
      sm:mx-4 lg:mx-0
      text-gray-700 font-semibold 

    lg:border-none

    sm:border-t-2 sm:border-gray-300
    "
    >
      <div className="lg:w-3/4 sm:w-full mx-auto">
        {isOwner && <PublishPost />}
        <div className="mt-4">{postElements.reverse()}</div>
      </div>
    </div>
  );
};

export default MyPosts;
