import React, { memo } from 'react';
import FriendItems from './FriendItems/FriendItems';
import { compose } from 'redux';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsSidebarHidden } from '../../redux/app-reducer';

const Sidebar = () => {
  const dispatch = useDispatch();

  if (useLocation().pathname.match('/messages') || window.innerWidth <= 720) {
    dispatch(setIsSidebarHidden(true));
    return null;
  } else dispatch(setIsSidebarHidden(false));

  return (
    <div className="p-6">
      <FriendItems />
    </div>
  );
};

export default compose(memo)(Sidebar);
