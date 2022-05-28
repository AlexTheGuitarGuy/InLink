import s from './Status.module.css';
import React, { useEffect, useState } from 'react';

const Status = ({ canEdit, updateStatus, status }) => {
  const [isEditing, setEditing] = useState(false);
  const [localStatus, setStatus] = useState(status);

  const activateEdit = () => {
    if (canEdit) setEditing(true);
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
      {(!isEditing && (
        <span className={s.descriptionText} onClick={activateEdit}>
          {status || 'No status'}
        </span>
      )) ||
        (isEditing && (
          <input
            onChange={editLocalStatus}
            className={s.descriptionEdit}
            autoFocus={true}
            onBlur={deactivateEdit}
            defaultValue={localStatus}
          />
        ))}
    </div>
  );
};

export default Status;
