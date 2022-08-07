import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const Users = ({ users }) => {
  const userElements = users.map((e) => {
    return (
      <div key={e.id} className="sm:border-b sm:border-gray-200 lg:border-none">
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
            className="lg:h-16 lg:w-16 
                        sm:h-24 sm:w-24
                        rounded-full"
          />
          <div
            className="sm:ml-8 lg:ml-4 
                      sm:text-xl lg:text-sm"
          >
            {e.name}
          </div>
        </NavLink>
      </div>
    );
  });

  return (
    <div className="lg:border-r lg:border-gray-300 lg:w-1/5 sm:w-full">
      <div
        className="sm:text-3xl lg:text-xl
                  sm:text-center lg:text-left
                  sm:m-4 lg:m-0"
      >
        Messages
      </div>
      <div className="sm:ml-8 sm:mt-10 lg:m-0">{userElements}</div>
    </div>
  );
};

export default memo(Users);
