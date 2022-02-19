import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {
  setProfile,
  toggleLoading,
} from './../../redux/profile-reducer';

class ProfileContainer extends React.Component {
  componentDidMount = () => {
    this.props.toggleLoading();
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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

export default connect(mapStateToProps, {
  setProfile,
  toggleLoading,
})(ProfileContainer);
