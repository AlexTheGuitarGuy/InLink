import React, { memo } from 'react';
import Header from './Header.jsx';
import { connect } from 'react-redux';
import { auth, setData } from '../../redux/auth-reducer';
import { getIsLoggedIn, getLogin } from '../../redux/auth-selector';
import { compose } from 'redux';
import { getNavItems } from '../../redux/navbar-selector';

const HeaderContainer = (props) => {
  return <Header {...props} />;
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: getIsLoggedIn(state),
    login: getLogin(state),
    navItems: getNavItems(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    setData,
    auth,
  }),
  memo,
)(HeaderContainer);
