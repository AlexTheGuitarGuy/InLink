import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Users.module.css';

const Users = (props) => {
  let userElements = props.state.map((e) => {
    return (
      <div key={e.id}>
        <NavLink
          to={'/messages/' + e.id}
          className={(navData) =>
            navData.isActive ? s.active : s.dialogUser
          }
        >
          <div className={s.pfp}>{e.pfp}</div>

          <div className={s.dialogUser}>
            {e.name[0] + ' ' + e.name[1]}
          </div>
        </NavLink>
      </div>
    );
  });

  return (
    <div className={s.overall}>
      <div className={s.messagesText}>Messages:</div>
      <div className={s.userElements}>{userElements}</div>
    </div>
  );
};

export default Users;
