import { Meta } from '@storybook/react'
import ConfirmDialog, {
  ConfirmDialogProps,
} from '@/components/common/Dialogs/ConfirmDialog/ConfirmDialog'

export default {
  title: 'Dialogs/ConfirmDialog',
  component: ConfirmDialog,
} as Meta<typeof ConfirmDialog>

export const Default = ({ name, confirmText, isShown }: ConfirmDialogProps) => {
  return (
    <ConfirmDialog isShown={isShown} onClose={() => {}} name={name} confirmText={confirmText}>
      <div className='w-full'>
        <div className='mx-auto'>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
        </div>
      </div>
    </ConfirmDialog>
  )
}

Default.args = {
  isShown: true,
  name: 'DialogName',
  confirmText: 'Please confirm this action',
}
