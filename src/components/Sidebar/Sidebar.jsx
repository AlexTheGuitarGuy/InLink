import React, { memo } from 'react';
import s from './Sidebar.module.css';
import FriendItems from './FriendItems/FriendItems';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getIsLoggedIn } from '../../redux/auth-selector';

const Sidebar = ({ friends, isLoggedIn }) => {
  return (
    <div className={s.sidebar}>
      {isLoggedIn && <FriendItems friends={friends} />}
    </div>
  );
};

const mstp = (state) => ({
  isLoggedIn: getIsLoggedIn(state),
});

export default compose(memo, connect(mstp, null))(Sidebar);
