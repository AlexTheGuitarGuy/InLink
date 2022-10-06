import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useFormikContext } from 'formik'

import { profileActions } from '../../../../redux/profile-reducer/profile-reducer'
import PrimaryButton from '../../../common/Buttons/PrimaryButton/PrimaryButton'

type EditButtonProps = {
  isEditing: boolean
  isSubmitting: boolean
  isValid: boolean
}

const EditButton: FC<EditButtonProps> = ({ isEditing, isSubmitting, isValid }) => {
  const dispatch = useDispatch()
  const { submitForm } = useFormikContext()

  return (
    <PrimaryButton
      color='gray'
      onClick={() => (isEditing ? submitForm() : dispatch(profileActions.setEditing(true)))}
      disabled={isSubmitting || !isValid}
      className='py-0.5 px-4
                    sm:mb-4 lg:mb-0
                    sm:w-full lg:w-auto'
    >
      {isEditing ? 'Save' : 'Edit mode'}
    </PrimaryButton>
  )
}

export default EditButton
