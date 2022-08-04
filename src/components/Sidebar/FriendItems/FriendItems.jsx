import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDialogUsers } from '../../../redux/dialogs-selector';

const FriendItems = () => {
  const friends = useSelector(getDialogUsers);

  let friendList = friends.map((e, i) => {
    if (i < 5) {
      return (
        <NavLink to={`/messages/${e.id}`} key={e.id}>
          <div
            className="p-2 flex items-center mt-4
          transition-colors
          border-b-2 border-transparent
          hover:bg-gray-200 active:bg-gray-300
          hover:text-gray-600 active:text-gray-700
          hover:border-gray-400 active:border-gray-500
          "
          >
            <img
              src={require(`../../../assets/pfps/u${e.id}.jpg`)}
              alt={`user ${e.id}`}
              className="h-12 w-12 rounded-full"
            />
            <div className="ml-2 text-sm">{e.name}</div>
          </div>
        </NavLink>
      );
    }
    return null;
  });

  return (
    <div className="text-gray-500 bg-gray-100 p-2 -mr-4 rounded-lg font-semibold">
      <div className="text-lg ml-2">Contacts:</div>
      <div>
        {friendList}
        {friendList.length > 5 && (
          <span className="font-normal ml-4 text-sm">
            and more...
          </span>
        )}
      </div>
    </div>
  );
};

export default FriendItems;
