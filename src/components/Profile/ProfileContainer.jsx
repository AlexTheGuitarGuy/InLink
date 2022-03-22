import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {
  getProfile,
  getStatus,
  setCanEdit,
  updateStatus,
} from '../../redux/profile-reducer';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import withAuthRedirect from './../HOC/withAuthRedirect';
import { compose } from 'redux';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let params = useParams();
    return <Component {...props} router={{ location, params }} />;
  }

  return ComponentWithRouterProp;
}
class ProfileContainer extends React.Component {
  componentDidMount = () => {
    let uid = this.props.router.params.uid || this.props.uid;

    if (uid === this.props.uid) this.props.setCanEdit(true);
    else this.props.setCanEdit(false);
    this.props.getProfile(uid);
    this.props.getStatus(uid);
  };

  render() {
    let props = { ...this.props };
    if (!this.props.isLoggedIn) return <Navigate to="/login" />;
    return <Profile {...props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.profilePage,
    isLoading: state.profilePage.isLoading,
    isLoggedIn: state.auth.isLoggedIn,
    uid: state.auth.id,
    canEdit: state.profilePage.canEdit,
  };
};

export default compose(
  withAuthRedirect,
  withRouter,
  connect(mapStateToProps, {
    getProfile,
    getStatus,
    updateStatus,
    setCanEdit,
  }),
)(ProfileContainer);
