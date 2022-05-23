import { connect } from 'react-redux';
import Users from './Users';
import {
  follow,
  getUsers,
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
  getUsersPage,
} from '../../redux/users-page-selector';

const UsersContainer = (props) => {
  const changePage = (page) => {
    props.getUsers(page, props.pageSize);
    props.setPage(page);
  };

  useEffect(() => {
    props.getUsers(props.page, props.pageSize);
  }, [props.page, props.pageSize]);

  return (
    <Users
      state={props.state}
      totalUsers={props.totalUsers}
      pageSize={props.pageSize}
      changePage={changePage}
      page={props.page}
      currentPagesBeginning={props.currentPagesBeginning}
      setCurrentPages={props.setCurrentPages}
      isLoading={props.isLoading}
      followQueue={props.followQueue}
      updateFollowQueue={props.updateFollowQueue}
      follow={props.follow}
      unfollow={props.unfollow}
    />
  );
};

let mapStateToProps = (state) => {
  return {
    state: getUsersPage(state),
    page: getPage(state),
    pageSize: getPageSize(state),
    totalUsers: getTotalUsers(state),
    currentPagesBeginning: getCurrentPagesBeginning(state),
    isLoading: getIsLoading(state),
    followQueue: getFollowQueue(state),
  };
};

export default connect(mapStateToProps, {
  getUsers,
  follow,
  unfollow,
  setPage,
  setCurrentPages,
  updateFollowQueue,
})(UsersContainer);
