import React from 'react';
import s from './Post.module.css';
import pfp from '../../../../assets/pfps/myPfp.jpg';

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src={pfp} alt="poster_pfp" />

      <div className={s.text}>{props.text}</div>
      <div>
        <div className={s.likeSymbol}>❤</div>
        <div className={s.likeCount}>{props.likeCount}</div>
      </div>
    </div>
  );
};

export default Post;
