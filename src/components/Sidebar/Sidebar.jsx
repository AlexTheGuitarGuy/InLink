import React, { memo } from 'react';
import FriendItems from './FriendItems/FriendItems';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getIsLoggedIn } from '../../redux/auth-selector';

const Sidebar = ({ friends, isLoggedIn }) => {
  return (
    <div className="p-6 h-screen">
      {isLoggedIn && <FriendItems friends={friends} />}
    </div>
  );
};

const mstp = (state) => ({
  isLoggedIn: getIsLoggedIn(state),
});

export default compose(memo, connect(mstp, null))(Sidebar);
