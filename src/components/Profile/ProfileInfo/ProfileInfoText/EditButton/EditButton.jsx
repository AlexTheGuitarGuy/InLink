import React from 'react';

const EditButton = ({ setEditing }) => {
  return (
    <button
      onClick={() => setEditing(true)}
      className="font-semibold
                    bg-gray-500 hover:bg-gray-600 active:bg-gray-700
                    text-gray-100 text-center
                    py-0.5 px-4 rounded
                    transition-colors cursor-pointer
                    focus:outline-none focus:ring-0"
    >
      Edit mode
    </button>
  );
};

export default EditButton;
