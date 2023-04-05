import { Search } from '@mui/icons-material'
import cn from 'classnames'
import { Field } from 'formik'
import { FC } from 'react'

import FormInput from '../../../common/Inputs/FormInput/FormInput'

type JobInfoProps = {
  lookingForAJob: boolean
  lookingForAJobDescription: string
  isEditMode: boolean
  isError?: boolean
}

const JobInfo: FC<JobInfoProps> = ({
  lookingForAJob,
  lookingForAJobDescription,
  isEditMode,
  isError,
}) => {
  return (
    <div>
      {(lookingForAJob || isEditMode) && (
        <div
          className={cn({
            'bg-neutralChild p-4 border rounded-lg border-onNeutralBg flex items-center flex-col':
              !isEditMode,
          })}
        >
          <div className='order-1 space-x-1 flex'>
            {isEditMode ? (
              <Field
                id='lookingForAJob'
                type='checkbox'
                name='lookingForAJob'
                checked={lookingForAJob}
              />
            ) : (
              <Search />
            )}
            <label htmlFor='lookingForAJob'>looking for a job</label>
          </div>

          <div className='order-2 mt-2 text-center w-full'>
            {lookingForAJob && isEditMode ? (
              <FormInput
                error={{ isError: !!isError }}
                field={{
                  name: 'lookingForAJobDescription',
                  placeholder: 'Please enter your skills...',
                  as: 'textarea',
                  className: 'resize-none',
                }}
              />
            ) : lookingForAJobDescription && !isEditMode ? (
              <span className='break-words'>{lookingForAJobDescription}</span>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

export default JobInfo
