import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './UserItems.module.css';
import { userAPI } from './../../../api/API';
import placeholder from '../../../assets/pfps/placeholder.jpg';

const UserItems = ({
  users,
  changeFollowStatus,
  followQueue,
  updateFollowQueue,
}) => {
  let mappedUsers = users.map((e) => {
    let changeFollowStatus = () => {
      changeFollowStatus(e.id);
    };

    let buttonText = e.followed ? 'Unfollow' : 'Follow';
    let buttonAction = e.followed ? userAPI.unfollow : userAPI.follow;
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
              updateFollowQueue(e.id);
              buttonAction(e.id).then((data) => {
                if (data.resultCode === 0) changeFollowStatus();
                updateFollowQueue(e.id);
              });
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
