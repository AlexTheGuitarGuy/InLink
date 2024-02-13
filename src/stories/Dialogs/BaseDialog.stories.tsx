import { Meta } from '@storybook/react'
import BaseDialog, { BaseDialogProps } from '../../components/common/Dialogs/BaseDialog/BaseDialog'

export default {
  title: 'Dialogs/BaseDialog',
  component: BaseDialog,
} as Meta<typeof BaseDialog>

export const Default = ({ name, showFooter, isShown }: BaseDialogProps) => {
  return (
    <BaseDialog isShown={isShown} onClose={() => {}} name={name} showFooter={showFooter}>
      <div className='w-full bg-green-300'>
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
    </BaseDialog>
  )
}

Default.args = {
  isShown: true,
  showFooter: true,
  name: 'DialogName',
}
