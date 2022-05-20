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
import React from 'react';
import {
  getCurrentPagesBeginning,
  getFollowQueue,
  getIsLoading,
  getPage,
  getPageSize,
  getTotalUsers,
  getUsersPage,
} from '../../redux/users-page-selector';

class UsersContainer extends React.Component {
  componentDidMount = () => {
    this.props.getUsers(this.props.page, this.props.pageSize);
  };

  changePage = (page) => {
    this.props.getUsers(page, this.props.pageSize);
    this.props.setPage(page);
  };

  render() {
    return (
      <Users
        state={this.props.state}
        totalUsers={this.props.totalUsers}
        pageSize={this.props.pageSize}
        changePage={this.changePage}
        page={this.props.page}
        currentPagesBeginning={this.props.currentPagesBeginning}
        setCurrentPages={this.props.setCurrentPages}
        isLoading={this.props.isLoading}
        followQueue={this.props.followQueue}
        updateFollowQueue={this.props.updateFollowQueue}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
      />
    );
  }
}

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
