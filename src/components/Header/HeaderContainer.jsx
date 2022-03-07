import React from 'react';
import Header from './Header.jsx';
import { connect } from 'react-redux';
import { setData } from './../../redux/auth-reducer';
import { userAPI } from './../../api/API';

class HeaderConatiner extends React.Component {
  componentDidMount() {
    userAPI.auth().then((data) => {
      window.state = this.props;
      if (data.resultCode === 0) {
        let { email, id, login } = data.data;
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
