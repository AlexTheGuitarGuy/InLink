import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormikContext } from 'formik';

import { profileActions } from '../../../../redux/profile-reducer/profile-reducer';

type EditButtonProps = {
  isEditing: boolean;
  isSubmitting: boolean;
  isValid: boolean;
};

const EditButton: FC<EditButtonProps> = ({ isEditing, isSubmitting, isValid }) => {
  const dispatch = useDispatch();
  const { submitForm } = useFormikContext();

  return (
    <button
      type="button"
      className="font-semibold
                    bg-gray-500 hover:bg-gray-600 active:bg-gray-700
                    text-gray-100 text-center
                    rounded
                    transition-colors cursor-pointer
                    focus:outline-none focus:ring-0

                    py-0.5 px-4
                    sm:mb-4 lg:mb-0
                    sm:w-full lg:w-auto"
      onClick={() => (isEditing ? submitForm() : dispatch(profileActions.setEditing(true)))}
      disabled={isSubmitting || !isValid}
    >
      {isEditing ? 'Save' : 'Edit mode'}
    </button>
  );
};

export default EditButton;
