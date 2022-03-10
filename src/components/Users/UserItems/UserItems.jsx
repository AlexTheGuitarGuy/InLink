import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './UserItems.module.css';
import { userAPI } from './../../../api/API';

export default function UserItems(props) {
  let mappedUsers = props.users.map((e) => {
    let changeFollowStatus = () => {
      props.changeFollowStatus(e.id);
    };

    let buttonText = e.followed ? 'Unfollow' : 'Follow';
    let buttonAction = e.followed ? userAPI.unfollow : userAPI.follow;

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

          <button
            disabled={props.followQueue.some((elem) => elem === e.id)}
            onClick={() => {
              props.updateFollowQueue(e.id);
              buttonAction(e.id).then((data) => {
                if (data.resultCode === 0) changeFollowStatus();
                props.updateFollowQueue(e.id);
              });
            }}
            className={s.unfollowButton}
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
}
