import React, { FC } from 'react'
import cn from 'classnames'
import { Field } from 'formik'
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
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1200px-Magnifying_glass_icon.svg.png'
                alt='looking for job'
                className='w-5 h-5 inline lg:mr-1'
              />
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
              '"' + lookingForAJobDescription + '"'
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

export default JobInfo
