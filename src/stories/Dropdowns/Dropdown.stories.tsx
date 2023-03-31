import { Delete, Edit } from '@mui/icons-material'
import { ComponentMeta } from '@storybook/react'

import Dropdown, { DropdownProps } from '../../components/common/Dropdown/Dropdown'
import DropdownItem from '../../components/common/Dropdown/DropdownItem/DropdownItem'

export default {
  title: 'Dropdowns/Dropdown',
  component: Dropdown,
  argTypes: {
    open: {
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<typeof Dropdown>

export const Default = ({ open, ...rest }: DropdownProps) => {
  return (
    <Dropdown open={open} {...rest}>
      <DropdownItem>test1</DropdownItem>
      <DropdownItem>test22222 222222 2222 2222</DropdownItem>
      <DropdownItem>test3 3333333333333333</DropdownItem>
      <DropdownItem>4</DropdownItem>
      <DropdownItem>test55</DropdownItem>
      <DropdownItem icon={<Edit />}>Edit</DropdownItem>
      <DropdownItem icon={<Delete />}>Delete</DropdownItem>
    </Dropdown>
  )
}

Default.args = {
  open: true,
  absolutePosition: 'left-0',
}
