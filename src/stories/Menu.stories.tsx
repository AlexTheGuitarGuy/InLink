import { ComponentMeta } from '@storybook/react'
import { Delete, Edit } from '@mui/icons-material'
import React from 'react'

import Menu, { MenuProps } from '../components/common/Menu/Menu'
import MenuItem from '../components/common/Menu/MenuItem/MenuItem'

export default {
  title: 'Menu',
  component: Menu,
  argTypes: {
    open: {
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<typeof Menu>

export const Default = ({ open, ...rest }: MenuProps) => {
  return (
    <Menu open={open === undefined ? true : open} {...rest}>
      <MenuItem>test1</MenuItem>
      <MenuItem>test22222 222222 2222 2222</MenuItem>
      <MenuItem>test3 3333333333333333</MenuItem>
      <MenuItem>4</MenuItem>
      <MenuItem>test55</MenuItem>
      <MenuItem icon={<Edit />}>Edit</MenuItem>
      <MenuItem icon={<Delete />}>Delete</MenuItem>
    </Menu>
  )
}
