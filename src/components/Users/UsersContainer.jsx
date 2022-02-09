import { connect } from 'react-redux';
import Users from './Users';
import { changeFollowStatusAC } from './../../redux/users-page-reducer';

let mapStateToProps = (state) => {
  return {
    state: state.usersPage,
  }
}

let mapDispatchToProps = (dispatch) => {
  return{
    changeFollowStatus: (id) => {
      dispatch(changeFollowStatusAC(id))
    }
  }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);