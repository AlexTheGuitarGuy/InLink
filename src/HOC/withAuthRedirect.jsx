import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

let withAuthRedirect = (Component) => {
  const RedirectComponent= (props)=> {
      if (!props.isLoggedIn) return <Navigate to="/login" />;
      return <Component {...props} />;
  }

  return connect(mapStateToProps, {})(RedirectComponent);
};

export default withAuthRedirect;
