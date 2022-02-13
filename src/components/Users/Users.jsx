import React from 'react';
import s from './Users.module.css';
import * as axios from 'axios';

const Users = (props) => {
  if (props.state.users.length === 0) {
    axios
      .get('https://social-network.samuraijs.com/api/1.0/users')
      .then((response) => {
        props.setUsers(response.data.items);
      });
  }

  let mappedUsers = props.state.users.map((e) => {
    let changeFollowStatus = () => {
      props.changeFollowStatus(e.id);
    };

    return (
      <div className={s.user} key={e.id}>
        <div>
          {e.photos.small != null ? (
            e.photos.small
          ) : (
            <img
              src={require('../../assets/pfps/placeholder.jpg')}
              alt="empty_pfp"
            />
          )}
        </div>
        <div>{e.name}</div>
        <button onClick={changeFollowStatus}>
          {e.isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    );
  });

  return <div>{mappedUsers}</div>;
};

export default Users;
