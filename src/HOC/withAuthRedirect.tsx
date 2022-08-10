import React, { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../redux/auth-selector';

let withAuthRedirect = (Component: FunctionComponent) => (props: any) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  if (!isLoggedIn) return <Navigate to="/login" />;
  return <Component {...props} />;
};

export default withAuthRedirect;
