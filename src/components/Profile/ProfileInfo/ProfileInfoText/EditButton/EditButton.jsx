import React from 'react';

const EditButton = ({ setEditing }) => {
  return (
    <span
      className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700
          text-gray-100 text-center
          py-1.5 px-4 rounded
          transition-colors cursor-pointer"
    >
      <button
        onClick={() => setEditing(true)}
        className="font-semibold"
      >
        Edit mode
      </button>
    </span>
  );
};

export default EditButton;
