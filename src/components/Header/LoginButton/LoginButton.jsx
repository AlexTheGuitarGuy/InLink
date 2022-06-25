import React from 'react';
import { NavLink } from 'react-router-dom';

const LoginButton = ({ logout, login, isLoggedIn }) => {
  return (
    <div className="flex flex-col items-end">
      {isLoggedIn && (
        <div className="font-semibold text-gray-700">{login}</div>
      )}
      <div
        className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-gray-100
            py-1 px-4 rounded
            font-semibold transition-colors
            cursor-pointer
            text-center"
      >
        {isLoggedIn ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <NavLink to={'/login'}>Log in</NavLink>
        )}
      </div>
    </div>
  );
};

export default LoginButton;
