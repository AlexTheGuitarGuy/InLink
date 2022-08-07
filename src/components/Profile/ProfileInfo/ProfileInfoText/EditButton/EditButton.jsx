import React from 'react';
import { useDispatch } from 'react-redux';
import { setEditing } from '../../../../../redux/profile-reducer';

const EditButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(setEditing(true))}
      className="font-semibold
                    bg-gray-500 hover:bg-gray-600 active:bg-gray-700
                    text-gray-100 text-center
                    rounded
                    transition-colors cursor-pointer
                    focus:outline-none focus:ring-0

                    py-0.5 px-4
                    sm:mb-4 lg:mb-0
                    sm:w-full lg:w-auto"
    >
      Edit mode
    </button>
  );
};

export default EditButton;
