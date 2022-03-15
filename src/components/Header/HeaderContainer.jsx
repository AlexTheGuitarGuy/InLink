import React from 'react';
import Header from './Header.jsx';
import { connect } from 'react-redux';
import { setData, auth } from './../../redux/auth-reducer';

class HeaderConatiner extends React.Component {
  componentDidMount() {
    this.props.auth();
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
  auth,
})(HeaderConatiner);
