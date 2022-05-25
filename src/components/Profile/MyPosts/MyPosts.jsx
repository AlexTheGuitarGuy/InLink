import React from 'react';
import Post from './Post/Post.jsx';
import Publish from './Publish/Publish.jsx';
import s from './MyPosts.module.css';

const MyPosts = ({ posts, ...props }) => {
  const postElements = posts.map((e) => (
    <Post key={e.id} text={e.text} likeCount={e.likes} />
  ));

  return (
    <div className={s.all}>
      <Publish {...props} />
      {postElements.reverse()}
    </div>
  );
};

export default MyPosts;
