import React from 'react';

const EditButton = ({ isOwner, setEditing }) => {
  return (
    <span className={'grid'}>
      {isOwner ? (
        <button onClick={() => setEditing(true)}>Edit mode</button>
      ) : null}
    </span>
  );
};

export default EditButton;
