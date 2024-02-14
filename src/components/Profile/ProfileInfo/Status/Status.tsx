import cn from 'classnames'
import { Form, Formik } from 'formik'
import { FC, FormEvent, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { updateStatus } from '../../../../redux/profile-reducer/profile-reducer'
import { getStatus } from '../../../../redux/profile-reducer/profile-selector'
import FormInput from '../../../common/Inputs/FormInput/FormInput'
import Loading, { Dimensions } from '../../../common/Loading/Loading'

type StatusProps = {
  isOwner: boolean
}
const Status: FC<StatusProps> = ({ isOwner }) => {
  const status = useAppSelector(getStatus)

  const dispatch = useAppDispatch()

  const [isEditing, setEditing] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const activateEdit = () => {
    if (isOwner) setEditing(true)
  }

  const onSubmit = ({ status }: { status: string }) => {
    setEditing(false)
    setLoading(true)
    dispatch(updateStatus(status)).then(() => setLoading(false))
  }

  return (
    <div className='transition-colors break-words xl:text-xl relative flex justify-between'>
      {!isEditing ? (
        <div
          onClick={activateEdit}
          className={cn(`p-1 rounded max-w-sm transition-colors duration-150 w-full`, {
            'hover:bg-neutralChild cursor-pointer': isOwner,
          })}
        >
          {status ? '"' + status + '"' : 'No status'}
        </div>
      ) : (
        <div className='w-full'>
          <Formik initialValues={{ status }} onSubmit={onSubmit}>
            {({ handleSubmit }) => (
              <Form>
                <FormInput
                  field={{
                    name: 'status',
                    placeholder: 'Status...',
                    className: 'p-1 lg:pl-2.5 sm:text-center lg:text-left',
                    restprops: {
                      type: 'submit',
                      autoFocus: true,
                      onBlur: (event: FormEvent<HTMLFormElement>) => {
                        handleSubmit(event)
                      },
                    },
                    as: 'input',
                  }}
                />
              </Form>
            )}
          </Formik>
        </div>
      )}

      {isLoading && (
        <div className='z-40 flex justify-center items-center'>
          <Loading dimensions={Dimensions.SMALL} />
        </div>
      )}
    </div>
  )
}

export default Status
