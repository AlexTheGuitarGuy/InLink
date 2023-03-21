import { ComponentMeta } from '@storybook/react'
import React from 'react'
import BaseDialog, { BaseDialogProps } from '../../components/common/Dialogs/BaseDialog/BaseDialog'

export default {
  title: 'Dialogs/BaseDialog',
  component: BaseDialog,
} as ComponentMeta<typeof BaseDialog>

export const Default = ({ name, showFooter, isShown }: BaseDialogProps) => {
  return (
    <BaseDialog isShown={isShown} onClose={() => {}} name={name} showFooter={showFooter}>
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
    </BaseDialog>
  )
}

Default.args = {
  isShown: true,
  showFooter: true,
  name: 'DialogName',
}
