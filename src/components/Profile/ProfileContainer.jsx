import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfile } from '../../redux/profile-reducer';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import withAuthRedirect from './../HOC/withAuthRedirect';
import { compose } from 'redux';

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
  state = {
    isEditing: false,
  };

  editMode = (payload) => {
    this.setState({ isEditing: payload });
  };

  componentDidMount = () => {
    this.props.getProfile(this.props.router.params.uid);
  };

  render() {
    let props = { ...this.props, ...this.state };
    if (!this.props.isLoggedIn) return <Navigate to="/login" />;
    return <Profile {...props} editMode={this.editMode} />;
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.profilePage,
    profileData: state.userData.profileData,
    isLoading: state.profilePage.isLoading,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default compose(
  withAuthRedirect,
  withRouter,
  connect(mapStateToProps, {
    getProfile,
  }),
)(ProfileContainer);
