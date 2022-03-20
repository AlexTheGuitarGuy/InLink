import React from 'react';
import s from './SendText.module.css';

const SendText = (props) => {
  let newPost = React.createRef();

  let post = () => {
    props.send(props.id);
  };

  let takeText = () => {
    let text = newPost.current.value;
    props.storeText(text);
  };
  return (
    <div className={s.sendText}>
      <input
        className={s.textArea}
        ref={newPost}
        value={props.memoryText}
        onChange={() => takeText()}
        onKeyPress={(e) => {
          if (e.key === 'Enter') post();
        }}
        placeholder="Enter your message"
      />

      <div>
        <button onClick={post} className={s.button}>
          Send
        </button>
      </div>
    </div>
  );
};

export default SendText;
