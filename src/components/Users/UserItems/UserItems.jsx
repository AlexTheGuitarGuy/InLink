import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './UserItems.module.css';
import placeholder from '../../../assets/pfps/placeholder.jpg';

const UserItems = ({ users, followQueue, follow, unfollow }) => {
  let mappedUsers = users.map((e) => {
    let buttonText = e.followed ? 'Unfollow' : 'Follow';
    let buttonAction = e.followed ? unfollow : follow;
    let buttonClass = e.followed ? s.unfollowButton : s.followButton;

    return (
      <div className={s.user} key={e.id}>
        <div className={s.interact}>
          <div>
            <NavLink to={'/profile/' + (e.uniqueUrlName || e.id)}>
              {e.photos.small != null ? (
                <img src={e.photos.small} alt="userPfp" />
              ) : (
                <img src={placeholder} alt="empty_pfp" />
              )}
            </NavLink>
          </div>

          <button
            disabled={followQueue.some((elem) => elem === e.id)}
            onClick={() => {
              buttonAction(e.id);
            }}
            className={buttonClass}
          >
            {buttonText}
          </button>
        </div>

        <div className={s.content}>
          <div className={s.name}>{e.name}</div>
          <div className={s.bio}>{e.status}</div>
        </div>
      </div>
    );
  });
  return <div>{mappedUsers}</div>;
};

export default UserItems;
