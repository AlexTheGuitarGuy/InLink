import s from './Status.module.css';
import React, { useEffect, useState } from 'react';

const Status = (props) => {
  const [isEditing, setEditing] = useState(false);
  const [status, setStatus] = useState(props.status);

  const activateEdit = () => {
    if (props.canEdit) setEditing(true);
  };
  const deactivateEdit = () => {
    setEditing(false);
    props.updateStatus(status);
  };

  const editLocalStatus = (e) => {
    setStatus(e.currentTarget.value);
  };

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  return (
    <div className={s.all}>
      {(!isEditing && (
        <div className={s.descriptionText} onClick={activateEdit}>
          {props.status || 'No status'}
        </div>
      )) ||
        (isEditing && (
          <input
            onChange={editLocalStatus}
            className={s.descriptionEdit}
            autoFocus={true}
            onBlur={deactivateEdit}
            defaultValue={status}
          />
        ))}
    </div>
  );
};

export default Status;
