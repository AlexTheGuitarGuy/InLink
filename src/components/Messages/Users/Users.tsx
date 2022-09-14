import React, { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { DialogsUser } from '../../../types/types';

type UsersProps = {
  users: DialogsUser[];
};

const Users: FC<UsersProps> = ({ users }) => {
  const userElements = users.map(({ name, avatar }: DialogsUser, index: number) => {
    return (
      <div key={name} className="sm:border-b sm:border-gray-200 lg:border-none">
        <NavLink
          to={`/messages/${index}`}
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
            src={avatar}
            alt={name}
            className="h-16 w-16 
                        rounded-full"
          />
          <div
            className="sm:ml-8 lg:ml-4 
                      sm:text-md lg:text-sm"
          >
            {name}
          </div>
        </NavLink>
      </div>
    );
  });

  return (
    <div className="lg:border-r lg:border-gray-300 lg:w-1/5 sm:w-full">
      <div
        className="text-xl
                  sm:text-center lg:text-left
                  sm:m-4 lg:m-0"
      >
        Messages
      </div>
      <div className="sm:mx-8 sm:mt-4 lg:m-0">{userElements}</div>
    </div>
  );
};

export default memo(Users);
