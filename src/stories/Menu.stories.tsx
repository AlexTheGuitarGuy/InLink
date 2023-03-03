import { Menu, MenuItem } from '@mui/material'
import { ComponentMeta } from '@storybook/react'

export default {
  title: 'Menu',
  component: Menu,
} as ComponentMeta<typeof Menu>

export const Default = () => (
  <Menu open={true}>
    <MenuItem>test1</MenuItem>
    <MenuItem>test2</MenuItem>
    <MenuItem>test3</MenuItem>
  </Menu>
)
