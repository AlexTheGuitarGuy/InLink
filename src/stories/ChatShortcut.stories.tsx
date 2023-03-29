import { ComponentMeta } from '@storybook/react'
import React from 'react'

import ChatShortcut from '../components/Chat/ChatShortcut/ChatShortcut'

export default {
  title: 'Chat/ChatShortcut',
  component: ChatShortcut,
} as ComponentMeta<typeof ChatShortcut>

export const Default = () => {
  return <ChatShortcut />
}
