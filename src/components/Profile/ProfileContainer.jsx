import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {
  setProfile,
  toggleLoading,
} from './../../redux/profile-reducer';

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
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/${uid}`,
      )
      .then((response) => {
        this.props.setProfile(response.data);
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
