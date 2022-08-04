import React, { useEffect, useState } from 'react';
import cn from 'classnames';

const Status = ({ isOwner, updateStatus, status }) => {
  const [isEditing, setEditing] = useState(false);
  const [localStatus, setStatus] = useState(status);

  const activateEdit = () => {
    if (isOwner) setEditing(true);
  };
  const deactivateEdit = () => {
    setEditing(false);
    updateStatus(localStatus);
  };

  const editLocalStatus = (e) => {
    setStatus(e.currentTarget.value);
  };

  useEffect(() => {
    setStatus(status);
  }, [status]);

  return (
    <div className="inline transition-colors break-words ">
      {!isEditing ? (
        <div
          onClick={activateEdit}
          className={cn(`p-1 rounded max-w-sm`, {
            'hover:bg-gray-200 cursor-pointer': isOwner,
          })}
        >
          {status ? '"' + status + '"' : 'No status'}
        </div>
      ) : (
        <div>
          <input
            onChange={editLocalStatus}
            className="p-1 pl-2.5 rounded
            font-semibold text-gray-700
            border border-gray-300
            focus:outline-none focus:border-gray-500
            transition"
            autoFocus={true}
            onBlur={deactivateEdit}
            defaultValue={localStatus}
          />
        </div>
      )}
    </div>
  );
};

export default Status;
