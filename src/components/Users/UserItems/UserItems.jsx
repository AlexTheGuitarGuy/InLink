import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import placeholder from '../../../assets/pfps/placeholder.jpg';
import cn from 'classnames';

const UserItems = ({ users, followQueue, follow, unfollow }) => {
  const mappedUsers = users.map((e) => {
    const buttonText = e.followed ? 'Unfollow' : 'Follow';
    const buttonAction = e.followed ? unfollow : follow;
    const isDisabled = followQueue.some((elem) => elem === e.id);

    return (
      <div
        key={e.id}
        className="
        flex justify-between items-center
        my-2 p-4
        border rounded-lg border-gray-300
        bg-gray-200
        "
      >
        <div className="flex">
          <NavLink to={'/profile/' + (e.uniqueUrlName || e.id)}>
            <img
              src={e.photos.small || placeholder}
              alt="userPfp"
              className="rounded-full w-20 h-20 p-0.5
              hover:bg-gray-700 active:bg-gray-800 transition-color"
            />
          </NavLink>
          <div className="mt-3 ml-3 flex flex-col">
            <div className="text-xl">{e.name}</div>
            <div className="font-normal">{e.status}</div>
          </div>
        </div>

        <button
          disabled={isDisabled}
          onClick={() => {
            buttonAction(e.id);
          }}
          className={cn(
            `
          text-gray-100 text-center
          py-1 px-4 rounded
          transition-colors cursor-pointer font-semibold`,
            {
              'bg-gray-500 hover:bg-gray-600 active:bg-gray-700':
                !isDisabled,
            },
            {
              'bg-gray-300 text-gray-500 cursor-not-allowed':
                isDisabled,
            },
          )}
        >
          {buttonText}
        </button>
      </div>
    );
  });

  return <div className="mx-60">{mappedUsers}</div>;
};

export default memo(UserItems);
