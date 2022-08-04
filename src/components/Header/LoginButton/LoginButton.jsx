import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  getIsLoggedIn,
  getLogin,
} from '../../../redux/auth-selector';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/auth-reducer';

const LoginButton = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(getIsLoggedIn);
  const login = useSelector(getLogin);

  return (
    <div className="flex flex-col items-end">
      {isLoggedIn && (
        <div className="font-semibold text-gray-700">{login}</div>
      )}

      {isLoggedIn ? (
        <button
          onClick={() => dispatch(logout())}
          className="font-semibold
            bg-gray-500 hover:bg-gray-600 active:bg-gray-700
            py-0.5 px-4 text-gray-100 text-center
            rounded
            transition-colors cursor-pointer"
        >
          Log out
        </button>
      ) : (
        <NavLink
          to={'/login'}
          className="font-semibold
            bg-gray-500 hover:bg-gray-600 active:bg-gray-700
            py-0.5 px-4 text-gray-100 text-center
            rounded
            transition-colors cursor-pointer"
        >
          Log in
        </NavLink>
      )}
    </div>
  );
};

export default LoginButton;
