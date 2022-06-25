import React from 'react';
import { NavLink } from 'react-router-dom';

const FriendItems = ({ friends }) => {
  let friendList = friends.map((e, i) => {
    if (i < 5) {
      return (
        <NavLink to={`/messages/${e.id}`} key={e.id}>
          <div
            className="p-2 flex items-center mt-4
          transition-colors
          hover:bg-gray-400 hover:text-gray-600
          active:bg-gray-500 active:text-gray-700
          border-b-2 border-transparent hover:border-gray-500
          active:border-gray-600"
          >
            <img
              src={require(`../../../assets/pfps/u${e.id}.jpg`)}
              alt={`user ${e.id}`}
              className="h-12 w-12 rounded-full"
            />
            <span className="ml-2 text-lg">{e.name}</span>
          </div>
        </NavLink>
      );
    }
    return null;
  });

  return (
    <div className="text-gray-500 font-semibold">
      <div className="text-xl">Contacts:</div>
      <div>
        {friendList}
        {friendList.length > 5 && 'and more...'}
      </div>
    </div>
  );
};

export default FriendItems;
