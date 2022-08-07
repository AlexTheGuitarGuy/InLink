import React, { memo } from 'react';
import FriendItems from './FriendItems/FriendItems';
import { compose } from 'redux';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsSidebarHidden } from '../../redux/app-reducer';
import useScreenSize from '../../hooks/useScreenSize';

const Sidebar = () => {
  const dispatch = useDispatch();
  const screenSize = useScreenSize();

  if (useLocation().pathname.match('/messages') || screenSize.dynamicWidth < 1366) {
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
