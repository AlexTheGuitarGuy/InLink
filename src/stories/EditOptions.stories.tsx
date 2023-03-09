import { ComponentMeta } from '@storybook/react'
import React from 'react'

import EditOptions from '../components/common/Menu/EditOptions/EditOptions'

export default {
  title: 'EditOptions',
  component: EditOptions,
} as ComponentMeta<typeof EditOptions>

export const Default = () => {
  return (
    <div className='w-fit mx-auto'>
      <EditOptions onEdit={() => {}} onDelete={() => {}}></EditOptions>
    </div>
  )
}
