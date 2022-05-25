import { connect } from 'react-redux';
import Users from './Users';
import {
  follow,
  requestUsers,
  setCurrentPages,
  setPage,
  unfollow,
  updateFollowQueue,
} from '../../redux/users-page-reducer';
import React, { useEffect } from 'react';
import {
  getCurrentPagesBeginning,
  getFollowQueue,
  getIsLoading,
  getPage,
  getPageSize,
  getTotalUsers,
  getUsers,
} from '../../redux/users-page-selector';

const UsersContainer = ({
  users,
  page,
  pageSize,
  totalUsers,
  currentPagesBeginning,
  isLoading,
  followQueue,
  requestUsers,
  follow,
  unfollow,
  setPage,
  setCurrentPages,
  updateFollowQueue,
}) => {
  const changePage = (page) => {
    requestUsers(page, pageSize);
    setPage(page);
  };

  useEffect(() => {
    requestUsers(page, pageSize);
  }, [page, pageSize]);

  return (
    <Users
      users={users}
      totalUsers={totalUsers}
      pageSize={pageSize}
      changePage={changePage}
      page={page}
      currentPagesBeginning={currentPagesBeginning}
      setCurrentPages={setCurrentPages}
      isLoading={isLoading}
      followQueue={followQueue}
      updateFollowQueue={updateFollowQueue}
      follow={follow}
      unfollow={unfollow}
    />
  );
};

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    page: getPage(state),
    pageSize: getPageSize(state),
    totalUsers: getTotalUsers(state),
    currentPagesBeginning: getCurrentPagesBeginning(state),
    isLoading: getIsLoading(state),
    followQueue: getFollowQueue(state),
  };
};

export default connect(mapStateToProps, {
  requestUsers,
  follow,
  unfollow,
  setPage,
  setCurrentPages,
  updateFollowQueue,
})(UsersContainer);
