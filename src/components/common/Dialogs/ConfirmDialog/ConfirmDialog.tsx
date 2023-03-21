import { FC } from 'react'
import { ErrorOutline } from '@mui/icons-material'

import BaseDialog, { BaseDialogProps } from '../BaseDialog/BaseDialog'
import PrimaryButton from '../../Buttons/PrimaryButton/PrimaryButton'

export type ConfirmDialogProps = {
  confirmText?: string
} & Omit<BaseDialogProps, 'showFooter'>
const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isShown,
  onClose,
  name = 'Confirmation',
  confirmText = 'Please confirm this action.',
  onSubmit,
}) => {
  return (
    <BaseDialog isShown={isShown} onClose={onClose} name={name} showFooter={false}>
      <div className='w-[300px] flex flex-col items-center p-4 h-[250px]'>
        <ErrorOutline className='!text-7xl opacity-80' />
        <div className='text-lg text-center'>{confirmText}</div>
        <div className='mt-4 space-x-4'>
          <PrimaryButton onClick={onSubmit} className='px-5 py-3 text-lg'>
            Yes
          </PrimaryButton>
          <PrimaryButton onClick={onClose} className='px-5 py-3 text-lg' color='rose'>
            No
          </PrimaryButton>
        </div>
      </div>
    </BaseDialog>
  )
}

export default ConfirmDialog
