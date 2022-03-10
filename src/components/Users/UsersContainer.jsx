import { connect } from 'react-redux';
import Users from './Users';
import {
  changeFollowStatus,
  setUsers,
  setPage,
  setTotalUsers,
  setCurrentPages,
  toggleLoading,
  updateFollowQueue,
} from './../../redux/users-page-reducer';
import React from 'react';
import { userAPI } from './../../api/API';

class UsersContainer extends React.Component {
  componentDidMount = () => {
    this.props.toggleLoading();
    userAPI
      .getUsers(this.props.page, this.props.pageSize)
      .then((data) => {
        this.props.setUsers(data.items);
        this.props.setTotalUsers(data.totalCount);
        this.props.toggleLoading();
      });
  };

  changePage = (page) => {
    this.props.toggleLoading();
    this.props.setPage(page);
    userAPI.getUsers(page, this.props.pageSize).then((data) => {
      this.props.setUsers(data.items);
      this.props.toggleLoading();
    });
  };

  render() {
    return (
      <Users
        state={this.props.state}
        changeFollowStatus={this.props.changeFollowStatus}
        totalUsers={this.props.totalUsers}
        pageSize={this.props.pageSize}
        changePage={this.changePage}
        page={this.props.page}
        currentPagesBeginning={this.props.currentPagesBeginning}
        setCurrentPages={this.props.setCurrentPages}
        isLoading={this.props.isLoading}
        followQueue={this.props.followQueue}
        updateFollowQueue={this.props.updateFollowQueue}
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
  changeFollowStatus,
  setUsers,
  setPage,
  setTotalUsers,
  setCurrentPages,
  toggleLoading,
  updateFollowQueue,
})(UsersContainer);
