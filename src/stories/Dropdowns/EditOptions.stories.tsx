import { ComponentMeta } from '@storybook/react'
import EditOptions from '../../components/common/Dropdowns/EditOptions/EditOptions'

export default {
  title: 'Dropdowns/EditOptions',
  component: EditOptions,
} as ComponentMeta<typeof EditOptions>

export const Default = () => {
  return (
    <div className='w-fit mx-auto'>
      <EditOptions onEdit={() => {}} onDelete={() => {}}></EditOptions>
    </div>
  )
}
