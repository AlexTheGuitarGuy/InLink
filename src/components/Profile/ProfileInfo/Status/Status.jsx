import s from './Status.module.css';
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
    <div className={s.all}>
      {!isEditing ? (
        <span
          className={cn(s.descriptionText, { [s.isOwner]: isOwner })}
          onClick={activateEdit}
        >
          {status ? '"' + status + '"' : 'No status'}
        </span>
      ) : (
        <input
          onChange={editLocalStatus}
          className={s.descriptionEdit}
          autoFocus={true}
          onBlur={deactivateEdit}
          defaultValue={localStatus}
        />
      )}
    </div>
  );
};

export default Status;
