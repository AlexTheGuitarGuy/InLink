import React from 'react';
import s from './Post.module.css';
import pfp from '../../../../assets/pfps/myPfp.jpg';

const Post = ({ text, likeCount }) => {
  return (
    <div className={s.item}>
      <img src={pfp} alt="poster_pfp" />

      <div className={s.text}>{text}</div>
      <div>
        <div className={s.likeSymbol}>❤</div>
        <div className={s.likeCount}>{likeCount}</div>
      </div>
    </div>
  );
};

export default Post;
