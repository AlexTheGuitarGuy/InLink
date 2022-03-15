import { connect } from 'react-redux';
import Users from './Users';
import {
  getUsers,
  follow,
  unfollow,
  setPage,
  setCurrentPages,
  updateFollowQueue,
} from './../../redux/users-page-reducer';
import React from 'react';

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
    state: state.usersPage,
    page: state.usersPage.page,
    pageSize: state.usersPage.pageSize,
    totalUsers: state.usersPage.totalUsers,
    currentPagesBeginning: state.usersPage.currentPagesBeginning,
    isLoading: state.usersPage.isLoading,
    followQueue: state.usersPage.followQueue,
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
