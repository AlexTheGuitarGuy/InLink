import React, { FC } from 'react'
import cn from 'classnames'
import { Field } from 'formik'
import { Search } from '@mui/icons-material'

import FormInput from '../../../common/Inputs/FormInput/FormInput'

type JobInfoProps = {
  lookingForAJob: boolean
  lookingForAJobDescription: string
  isEditing: boolean
}

const JobInfo: FC<JobInfoProps> = ({ lookingForAJob, lookingForAJobDescription, isEditing }) => {
  return (
    <div className={cn({ 'w-full': !isEditing })}>
      {(lookingForAJob || isEditing) && (
        <div
          className={cn(
            `border rounded-lg border-gray-300
              bg-gray-200
              p-4 
              text-gray-700
              flex items-center flex-col`,
            { 'w-full': isEditing },
          )}
        >
          <div className='order-1'>
            {isEditing ? (
              <div className='mr-1 mt-1 inline'>
                <Field type='checkbox' name='lookingForAJob' checked={lookingForAJob} />
              </div>
            ) : (
              <Search />
            )}
            is looking for a job
          </div>

          <div className='order-2 mt-2 text-center w-full'>
            {lookingForAJob && isEditing ? (
              <FormInput
                field={{
                  name: 'lookingForAJobDescription',
                  placeholder: 'Please enter your skills...',
                  as: 'textarea',
                  className: 'resize-none py-1 px-4 w-full',
                }}
              />
            ) : lookingForAJobDescription && !isEditing ? (
              <span className='break-words'>{lookingForAJobDescription}</span>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

export default JobInfo
