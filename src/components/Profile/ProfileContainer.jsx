import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {
  setProfile,
  toggleLoading,
} from './../../redux/profile-reducer';
import { userAPI } from './../../api/API';

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
    this.props.toggleLoading();
    let uid = this.props.router.params.uid;
    if (!uid) uid = 2;
    userAPI.loadProfile(uid).then((data) => {
      this.props.setProfile(data);
      this.props.toggleLoading();
    });
  };

  render() {
    return <Profile {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.profilePage,
    profileData: state.userData.profileData,
    isLoading: state.profilePage.isLoading,
  };
};

let WithURLDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
  setProfile,
  toggleLoading,
})(WithURLDataContainerComponent);
