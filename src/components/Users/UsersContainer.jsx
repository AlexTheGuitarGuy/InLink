import { connect } from 'react-redux';
import Users from './Users';
import {
  changeFollowStatusAC,
  setUsersAC,
  setPageAC,
  setTotalUsersAC,
} from './../../redux/users-page-reducer';

let mapStateToProps = (state) => {
  return {
    state: state.usersPage,
    page: state.usersPage.page,
    pageSize: state.usersPage.pageSize,
    totalUsers: state.usersPage.totalUsers,
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
  };
};

export const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
