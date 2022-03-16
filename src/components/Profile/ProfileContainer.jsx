import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfile } from './../../redux/profile-reducer';
import { Navigate } from 'react-router-dom';
import withAuthRedirect from './../HOC/withAuthRedirect';
import { compose } from 'redux';

import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component {...props} router={{ location, navigate, params }} />
    );
  }

  return ComponentWithRouterProp;
}
class ProfileContainer extends React.Component {
  componentDidMount = () => {
    this.props.getProfile(this.props.router.params.uid);
  };

  render() {
    if (!this.props.isLoggedin) return <Navigate to="/login" />;
    return <Profile {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.profilePage,
    profileData: state.userData.profileData,
    isLoading: state.profilePage.isLoading,
    isLoggedin: state.auth.isLoggedIn,
  };
};

export default compose(
  withAuthRedirect,
  withRouter,
  connect(mapStateToProps, {
    getProfile,
  }),
)(ProfileContainer);
