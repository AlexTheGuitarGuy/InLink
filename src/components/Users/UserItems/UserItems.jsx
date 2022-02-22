import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './UserItems.module.css';
import * as axios from 'axios';

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
                axios
                  .delete(
                    `https://social-network.samuraijs.com/api/1.0/follow/${e.id}`,
                    {
                      withCredentials: true,
                      headers: {
                        'API-KEY':
                          '5e1fbd4d-d92a-43c5-b75a-b5fe33f28f28',
                      },
                    },
                  )
                  .then((response) => {
                    if (response.data.resultCode === 0)
                      changeFollowStatus();
                  })
              }
              className={s.unfollowButton}
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={() =>
                axios
                  .post(
                    `https://social-network.samuraijs.com/api/1.0/follow/${e.id}`,
                    {},
                    {
                      withCredentials: true,
                      headers: {
                        'API-KEY':
                          '5e1fbd4d-d92a-43c5-b75a-b5fe33f28f28',
                      },
                    },
                  )
                  .then((response) => {
                    if (response.data.resultCode === 0)
                      changeFollowStatus();
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
