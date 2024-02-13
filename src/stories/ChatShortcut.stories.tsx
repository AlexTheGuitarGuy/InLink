import { StoryFn } from '@storybook/react'

import ChatShortcut from '../components/Chat/ChatShortcut/ChatShortcut'
import withThemes from '../HOC/withThemes'

export default {
  title: 'Chat/ChatShortcut',
  component: ChatShortcut,
  decorators: [withThemes(ChatShortcut)],
}

export const Template: StoryFn<typeof ChatShortcut> = (args) => <ChatShortcut {...args} />

Template.args = {
  onOpen: () => {},
}
