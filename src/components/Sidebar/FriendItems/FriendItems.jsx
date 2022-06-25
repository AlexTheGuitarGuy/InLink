import React from 'react';
import s from './FriendItems.module.css';

const FriendItems = ({ friends }) => {
  let friendList = friends.map((e, i) => {
    if (i < 5) {
      return (
        <div className={s.friendItem} key={e.id}>
          <span>{e.pfp}</span>
          <span className={s.friendName}>
            {e.name[0] + ' ' + e.name[1][0] + '.'}
          </span>
        </div>
      );
    }
    return null;
  });

  return (
    <div className={s.friendList}>
      <div className={s.friendsText}>Friends:</div>
      <div className={s.friendElems}>
        {friendList}
        {friendList.length > 5 && 'and more...'}
      </div>
    </div>
  );
};

export default FriendItems;
