import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './UserItems.module.css';
import { userAPI } from './../../../api/API';

export default function UserItems(props) {
  let mappedUsers = props.users.map((e) => {
    let changeFollowStatus = () => {
      props.changeFollowStatus(e.id);
    };

    return (
      <div className={s.user} key={e.id}>
        <div className={s.interact}>
          <div>
            <NavLink to={'/profile/' + (e.uniqueUrlName || e.id)}>
              {e.photos.small != null ? (
                <img src={e.photos.small} alt="userPfp" />
              ) : (
                <img
                  src={require('../../../assets/pfps/placeholder.jpg')}
                  alt="empty_pfp"
                />
              )}
            </NavLink>
          </div>

          {e.followed ? (
            <button
              onClick={() =>
                userAPI.unfollow(e.id).then((data) => {
                  if (data.resultCode === 0) changeFollowStatus();
                })
              }
              className={s.unfollowButton}
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={() =>
                userAPI.follow(e.id).then((data) => {
                  if (data.resultCode === 0) changeFollowStatus();
                })
              }
              className={s.followButton}
            >
              Follow
            </button>
          )}
        </div>

        <div className={s.content}>
          <div className={s.name}>{e.name}</div>
          <div className={s.bio}>{e.status}</div>
        </div>
      </div>
    );
  });
  return <div>{mappedUsers}</div>;
}
