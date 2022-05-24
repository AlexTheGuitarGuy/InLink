import React from 'react';
import Header from './Header.jsx';
import { connect } from 'react-redux';
import { auth, setData } from '../../redux/auth-reducer';
import { getIsLoggedIn, getLogin } from '../../redux/auth-selector';
import { compose } from 'redux';

const HeaderContainer = (props) => {
  return <Header {...props} />;
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: getIsLoggedIn(state),
    login: getLogin(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    setData,
    auth,
  }),
  React.memo,
)(HeaderContainer);
