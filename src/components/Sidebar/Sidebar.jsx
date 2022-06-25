import React, { memo } from 'react';
import FriendItems from './FriendItems/FriendItems';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getIsLoggedIn } from '../../redux/auth-selector';

const Sidebar = ({ friends, isLoggedIn }) => {
  return (
    <div className="p-6 bg-gray-300 h-screen border-r-2 border-gray-400">
      {isLoggedIn && <FriendItems friends={friends} />}
    </div>
  );
};

const mstp = (state) => ({
  isLoggedIn: getIsLoggedIn(state),
});

export default compose(memo, connect(mstp, null))(Sidebar);
