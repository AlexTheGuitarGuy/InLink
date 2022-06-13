import React from 'react';
import PostElement from './Post/Post.jsx';
import PublishButton from './Publish/Publish.jsx';
import s from './MyPosts.module.css';
import placeholder from '../../../assets/pfps/placeholder.jpg';

const MyPosts = ({ posts, pfp, isOwner, ...props }) => {
  const postElements = posts.map((e) => (
    <PostElement
      key={e.id}
      text={e.text}
      likeCount={e.likes}
      pfp={pfp || placeholder}
    />
  ));

  return (
    <div className={s.all}>
      {isOwner && <PublishButton {...props} />}
      {postElements.reverse()}
    </div>
  );
};

export default MyPosts;
