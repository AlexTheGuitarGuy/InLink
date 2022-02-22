import React from 'react';
import Header from './Header.jsx';
import { connect } from 'react-redux';
import axios from 'axios';
import { setData } from './../../redux/auth-reducer';

class HeaderConatiner extends React.Component {
  componentDidMount() {
    axios
      .get('https://social-network.samuraijs.com/api/1.0/auth/me', {
        withCredentials: true,
      })
      .then((response) => {
        window.state = this.props;
        if (response.data.resultCode === 0) {
          let { email, id, login } = response.data.data;
          this.props.setData(id, login, email);
        }
      });
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    login: state.auth.login,
  };
};

export default connect(mapStateToProps, {
  setData,
})(HeaderConatiner);
