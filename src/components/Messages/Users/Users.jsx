import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const Users = ({ users }) => {
  let userElements = users.map((e) => {
    return (
      <div key={e.id}>
        <NavLink
          to={'/messages/' + e.id}
          className={({ isActive }) =>
            cn(
              `p-2 flex items-center mt-4
            transition-colors
            border-b-2 border-transparent
            hover:bg-gray-200 active:bg-gray-300
            hover:text-gray-600 active:text-gray-700
            hover:border-gray-400 active:border-gray-500
            `,
              {
                'bg-gray-300 text-gray-700 border-gray-500': isActive,
              },
            )
          }
        >
          <img
            src={require(`../../../assets/pfps/u${e.id}.jpg`)}
            alt={`user ${e.id}`}
            className="h-16 w-16 rounded-full"
          />
          <div className="ml-4">{e.name}</div>
        </NavLink>
      </div>
    );
  });

  return (
    <div className="border-r border-gray-300">
      <div className="text-xl">Messages:</div>
      <div>{userElements}</div>
    </div>
  );
};

export default memo(Users);
