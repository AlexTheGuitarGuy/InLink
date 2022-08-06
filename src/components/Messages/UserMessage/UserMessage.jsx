import React from 'react';
import cn from 'classnames';

const UserMessage = ({ message: { from, text }, pfp }) => {
  const isFromMe = from === 'me';

  let showMessages = () => {
    return (
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
          src={pfp}
          alt="me"
          className={cn(
            'h-10 w-10 rounded-full',
            { 'order-1': !isFromMe },
            { 'order-2': isFromMe },
          )}
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
  };

  return <div>{showMessages()}</div>;
};

export default UserMessage;
