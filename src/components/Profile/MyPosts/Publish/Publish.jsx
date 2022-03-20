import React from 'react';
import s from './Publish.module.css';

const Publish = (props) => {
  const newPost = React.createRef();

  const post = () => {
    props.post();
  };

  const takeText = () => {
    const text = newPost.current.value;
    props.storeText(text);
  };

  return (
    <div className={s.all}>
      <div className={s.newPost}>New post</div>

      <input
        className={s.textarea}
        ref={newPost}
        value={props.memoryText}
        onChange={() => takeText()}
        onKeyPress={(e) => {
          if (e.key === 'Enter') post();
        }}
        placeholder="Type what you think..."
      />
      <div>
        <button onClick={post} className={s.button}>
          Publish
        </button>
      </div>
    </div>
  );
};

export default Publish;
