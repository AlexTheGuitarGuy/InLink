import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import placeholder from '../../../assets/pfps/placeholder.jpg';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFollowQueue,
  getUsers,
} from '../../../redux/users-page-selector';
import { follow, unfollow } from '../../../redux/users-page-reducer';
import LoadingButton from '../../common/Loading/LoadingButton';

const UserItems = () => {
  const users = useSelector(getUsers);
  const followQueue = useSelector(getFollowQueue);

  const dispatch = useDispatch();

  const mappedUsers = users.map((e, i, arr) => {
    const buttonText = e.followed ? 'Unfollow' : 'Follow';
    const buttonAction = e.followed
      ? (id) => dispatch(unfollow(id))
      : (id) => dispatch(follow(id));
    const isDisabled = followQueue.some((elem) => elem === e.id);

    return (
      <div
        key={e.id}
        className={cn(
          `flex justify-between items-center
                my-2 p-4`,
          { 'border-b border-gray-300': i !== arr.length - 1 },
        )}
      >
        <NavLink
          to={'/profile/' + (e.uniqueUrlName || e.id)}
          className="flex"
        >
          <img
            src={e.photos.small || placeholder}
            alt="userPfp"
            className="rounded-full w-20 h-20 p-0.5
              transition-colors hover:bg-gray-700 active:bg-gray-800"
          />

          <div className="mt-3 ml-3 flex flex-col">
            <div
              className="text-xl
            border-b border-transparent
            hover:border-gray-600 active:border-gray-500
            hover:text-gray-600 active:text-gray-500"
            >
              {e.name}
            </div>
            <div
              className="font-normal
                        border-b border-transparent
            hover:border-gray-600 active:border-gray-500
            hover:text-gray-600 active:text-gray-500"
            >
              {e.status}
            </div>
          </div>
        </NavLink>

        <button
          disabled={isDisabled}
          onClick={() => {
            buttonAction(e.id);
          }}
          className={cn(
            `
          text-gray-100 text-center
          py-1 px-4 rounded
          transition-colors cursor-pointer font-semibold focus:outline-none focus:ring-0`,
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
          {(isDisabled && <LoadingButton />) || <>{buttonText}</>}
        </button>
      </div>
    );
  });

  return (
    <div
      className="mx-60
        border rounded-lg border-gray-300
        bg-gray-200"
    >
      {mappedUsers}
    </div>
  );
};

export default memo(UserItems);
