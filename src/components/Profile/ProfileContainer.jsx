import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {
  getProfile,
  getStatus,
  setCanEdit,
  updateStatus,
} from '../../redux/profile-reducer';
import { useLocation, useParams } from 'react-router-dom';
import withAuthRedirect from '../../HOC/withAuthRedirect';
import { compose } from 'redux';
import {
  getCanEdit,
  getIsLoading,
  getProfilePage,
} from '../../redux/profile-selector';
import { getIsLoggedIn, getUID } from '../../redux/auth-selector';

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
    return <Profile {...props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    state: getProfilePage(state),
    isLoading: getIsLoading(state),
    isLoggedIn: getIsLoggedIn(state),
    uid: getUID(state),
    canEdit: getCanEdit(state),
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
