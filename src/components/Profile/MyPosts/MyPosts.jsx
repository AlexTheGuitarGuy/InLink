import React from 'react';
import Post from './Post/Post.jsx';
import Publish from './Publish/Publish.jsx';

const MyPosts = (props) => {
  const postElements = props.posts.map((e) => (
    <Post key={e.id} text={e.text} likeCount={e.likes} />
  ));

  return (
    <div>
      <div>
        <Publish
          post={props.post}
          storeText={props.storeText}
          memoryText={props.memoryText}
        />
        {postElements.reverse()}
      </div>
    </div>
  );
};

export default MyPosts;
