import React from 'react';
import s from './UserMessages.module.css';

const UserMessage = ({
  message: { from, text },
  myPfp,
  theirPfp,
}) => {
  let showMessages = () => {
    if (from === 'me') {
      return (
        <div>
          <div className={s.myPfp}>
            <img src={myPfp} alt="me" />
          </div>
          <div className={s.fromMe}>{text}</div>
        </div>
      );
    } else {
      return (
        <div>
          <div className={s.theirPfp}>{theirPfp}</div>
          <div className={s.fromThem}>{text}</div>
        </div>
      );
    }
  };

  return <div>{showMessages()}</div>;
};

export default UserMessage;
