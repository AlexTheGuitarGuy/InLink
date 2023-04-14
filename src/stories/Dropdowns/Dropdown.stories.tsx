import { Delete, Edit } from '@mui/icons-material'
import { ComponentMeta } from '@storybook/react'

import BaseDropdown, {
  BaseDropdownProps,
} from '../../components/common/Dropdowns/BaseDropdown/BaseDropdown'
import DropdownItem from '../../components/common/Dropdowns/BaseDropdown/DropdownItem/DropdownItem'

export default {
  title: 'Dropdowns/Dropdown',
  component: BaseDropdown,
  argTypes: {
    open: {
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<typeof BaseDropdown>

export const Default = ({ open, ...rest }: BaseDropdownProps) => {
  return (
    <BaseDropdown open={open} {...rest}>
      <DropdownItem>test1</DropdownItem>
      <DropdownItem>test22222 222222 2222 2222</DropdownItem>
      <DropdownItem>test3 3333333333333333</DropdownItem>
      <DropdownItem>4</DropdownItem>
      <DropdownItem>test55</DropdownItem>
      <DropdownItem icon={<Edit />}>Edit</DropdownItem>
      <DropdownItem icon={<Delete />}>Delete</DropdownItem>
    </BaseDropdown>
  )
}

Default.args = {
  open: true,
  absolutePosition: 'left-0',
}
