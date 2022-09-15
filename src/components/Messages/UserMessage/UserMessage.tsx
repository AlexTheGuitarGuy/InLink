import React, { FC } from 'react';
import cn from 'classnames';
import { getMyData } from '../../../redux/profile-reducer/profile-selector';
import { useSelector } from 'react-redux';
import { UserMessage as UserMessageType } from '../../../types/types';
import Placeholder from '../../../assets/pfps/placeholder.jpg';

type UserMessageProps = {
  message: UserMessageType;
};

const UserMessage: FC<UserMessageProps> = ({ message: { name, type, text, avatar } }) => {
  const isFromMe = type === 'sent';
  const myData = useSelector(getMyData);

  const messages = (
    <div
      className={cn(
        'flex font-normal mt-8',
        {
          'justify-end ml-8': isFromMe,
        },
        { 'mr-8': !isFromMe },
      )}
    >
      <img
        src={(isFromMe ? myData?.photos?.small : avatar) || Placeholder}
        alt={name}
        className={cn('h-10 w-10 rounded-full', { 'order-1': !isFromMe }, { 'order-2': isFromMe })}
      />

      <div
        className={cn(
          'mt-2 p-2 rounded-b-lg',
          {
            'ml-4 order-2 bg-gray-400 text-white rounded-r-lg': !isFromMe,
          },
          {
            'mr-4 order-1 bg-blue-400 text-white rounded-l-lg': isFromMe,
          },
        )}
      >
        {text}
      </div>
    </div>
  );

  return <div>{messages}</div>;
};

export default UserMessage;
