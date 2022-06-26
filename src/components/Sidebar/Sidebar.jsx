import React, { memo } from 'react';
import FriendItems from './FriendItems/FriendItems';
import { compose } from 'redux';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsSidebarHidden } from '../../redux/app-reducer';

const Sidebar = ({ friends, setIsSidebarHidden }) => {
  if (useLocation().pathname.match('/messages')) {
    setIsSidebarHidden(true);
    return null;
  } else setIsSidebarHidden(false);

  return (
    <div className="p-6">
      <FriendItems friends={friends} />
    </div>
  );
};

export default compose(
  memo,
  connect(null, { setIsSidebarHidden }),
)(Sidebar);
