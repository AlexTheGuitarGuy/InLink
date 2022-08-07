import React from 'react';
import PostCard from './PostCard/PostCard.jsx';
import PublishPost from './PublishPost/PublishPost.jsx';
import placeholder from '../../../assets/pfps/placeholder.jpg';
import { useSelector } from 'react-redux';
import { getPosts } from '../../../redux/profile-selector';

const MyPosts = ({ pfp, isOwner, userName }) => {
  const posts = useSelector(getPosts);

  const postElements = posts.map(({ id, text, likes }) => (
    <PostCard key={id} text={text} likeCount={likes} pfp={pfp || placeholder} userName={userName} />
  ));

  return (
    <div
      className="flex flex-col justify-between
      lg:bg-gray-100 lg:rounded-lg p-8 lg:mt-4
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
