import { connect } from 'react-redux';
import Users from './Users';
import {
  changeFollowStatusAC,
  setUsersAC,
  setPageAC,
  setTotalUsersAC,
  setCurrentPagesAC,
} from './../../redux/users-page-reducer';

let mapStateToProps = (state) => {
  return {
    state: state.usersPage,
    page: state.usersPage.page,
    pageSize: state.usersPage.pageSize,
    totalUsers: state.usersPage.totalUsers,
    currentPagesBeginning: state.usersPage.currentPagesBeginning,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    changeFollowStatus: (id) => {
      dispatch(changeFollowStatusAC(id));
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users));
    },
    setPage: (page) => {
      dispatch(setPageAC(page));
    },
    setTotalUsers: (totalUsers) => {
      dispatch(setTotalUsersAC(totalUsers));
    },
    setCurrentPages: (newBeginning) => {
      dispatch(setCurrentPagesAC(newBeginning));
    },
  };
};

export const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
