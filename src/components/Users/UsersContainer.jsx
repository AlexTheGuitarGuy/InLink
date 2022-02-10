import { connect } from 'react-redux';
import Users from './Users';
import { changeFollowStatusAC, setUsersAC } from './../../redux/users-page-reducer';

let mapStateToProps = (state) => {
  return {
    state: state.usersPage,
  }
}

let mapDispatchToProps = (dispatch) => {
  return{
    changeFollowStatus: (id) => {
      dispatch(changeFollowStatusAC(id))
    },
    setUsers: (users) => {dispatch(setUsersAC(users))},
  }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);