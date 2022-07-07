import React from 'react';
import { NavLink } from 'react-router-dom';

const LoginButton = ({ logout, login, isLoggedIn }) => {
  return (
    <div className="flex flex-col items-end">
      {isLoggedIn && (
        <div className="font-semibold text-gray-700">{login}</div>
      )}

      {isLoggedIn ? (
        <button
          onClick={logout}
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
