import React from 'react';
import PostElement from './Post/Post.jsx';
import PublishPost from './Publish/Publish.jsx';
import placeholder from '../../../assets/pfps/placeholder.jpg';

const MyPosts = ({ posts, pfp, isOwner, userName, ...props }) => {
  const postElements = posts.map((e) => (
    <PostElement
      key={e.id}
      text={e.text}
      likeCount={e.likes}
      pfp={pfp || placeholder}
      userName={userName}
    />
  ));

  return (
    <div
      className="flex flex-col justify-between
      bg-gray-100 rounded-lg p-8 mt-4
    text-gray-700 font-semibold"
    >
      <div className="mx-60">
        {isOwner && <PublishPost {...props} />}
        <div className="mt-4">{postElements.reverse()}</div>
      </div>
    </div>
  );
};

export default MyPosts;
