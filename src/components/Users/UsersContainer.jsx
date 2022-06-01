import { connect } from 'react-redux';
import Users from './Users';
import {
  follow,
  requestUsers,
  setPage,
  unfollow,
  updateFollowQueue,
} from '../../redux/users-page-reducer';
import React, { useEffect } from 'react';
import {
  getFollowQueue,
  getIsLoading,
  getPage,
  getPageSize,
  getPortionSize,
  getTotalUsers,
  getUsers,
} from '../../redux/users-page-selector';

const UsersContainer = ({
  users,
  page,
  pageSize,
  totalUsers,
  isLoading,
  followQueue,
  requestUsers,
  follow,
  unfollow,
  setPage,
  updateFollowQueue,
  portionSize,
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
      portionSize={portionSize}
      users={users}
      totalUsers={totalUsers}
      pageSize={pageSize}
      changePage={changePage}
      page={page}
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
    isLoading: getIsLoading(state),
    followQueue: getFollowQueue(state),
    portionSize: getPortionSize(state),
  };
};

export default connect(mapStateToProps, {
  requestUsers,
  follow,
  unfollow,
  setPage,
  updateFollowQueue,
})(UsersContainer);
