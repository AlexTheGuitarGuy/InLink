import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'
import { compose } from 'redux'

import { getUserMessages } from '../../redux/dialogs-reducer/dialogs-selector'
import { getMyData } from '../../redux/profile-reducer/profile-selector'
import { getFrontPageFriends } from '../../redux/users-reducer/users-selector'

import withAuthRedirect from '../../HOC/withAuthRedirect'
import useScreenSize from '../../hooks/useScreenSize'

import { UserMessage as UserMessageType } from '../../types/types'

import { useAppDispatch } from '../../hooks/reduxHooks'
import { dialogsActions } from '../../redux/dialogs-reducer/dialogs-reducer'
import Loading from '../common/Loading/Loading'
import UserMessage from '../common/Messages/UserMessage/UserMessage'
import MessageForm from './MessagesForm/MessagesForm'
import Users from './Users/Users'

const InboxMesssages = () => {
  const userMessages = useSelector(getUserMessages)
  const users = useSelector(getFrontPageFriends)
  const myData = useSelector(getMyData)

  const dispatch = useAppDispatch()

  const screenSize = useScreenSize()

  useEffect(() => {
    dispatch(dialogsActions.initializeStoredMessages(userMessages.length))
  }, [dispatch, userMessages])

  if (!myData || !users) return <Loading />

  const createConversationComponent = (
    conversation: UserMessageType[],
    conversationIndex: number,
  ) =>
    conversation.map((message: UserMessageType, index, array) => (
      <UserMessage
        key={message.id}
        message={message.text}
        isFromMe={message.type === 'sent'}
        isPreviousFromSameUser={array[index - 1]?.type === message.type}
        isNextFromSameUser={array[index + 1]?.type === message.type}
        isFirst={index === 0}
        isLast={index === array.length - 1}
        onDelete={() => dispatch(dialogsActions.deleteMessage(message.id))}
        onEdit={(text) => dispatch(dialogsActions.editMessage(message.id, text))}
        userProfileLink={
          '/profile/' +
          (message.type === 'received'
            ? users[conversationIndex].uniqueUrlName || users[conversationIndex].id
            : '')
        }
        userName={users[conversationIndex].name}
        userPhoto={users[conversationIndex].photos.small}
      />
    ))

  const conversationComponents = userMessages.map(
    (conversation: UserMessageType[], conversationIndex) =>
      createConversationComponent(conversation, conversationIndex),
  )

  const routes = conversationComponents.map((conversationComponent: ReactNode[], index: number) => {
    return (
      <Route
        path={`/${index}`}
        key={index}
        element={
          <div className='flex flex-col h-full w-full relative'>
            <div className='space-y-1 h-[78vh] mt-4 mx-8 overflow-x-hidden'>
              {conversationComponent}
            </div>
            <div
              className='fixed bottom-0 lg:w-3/5 sm:w-full self-center
              pb-4 rounded-t px-2 py-2 bg-neutralBg'
            >
              <MessageForm index={index} />
            </div>
          </div>
        }
      />
    )
  })

  return (
    <div
      className='flex
         lg:bg-neutralBg lg:rounded-lg lg:p-8 lg:font-semibold'
    >
      {screenSize.dynamicWidth >= 1366 && <Users users={users} />}

      <Routes>
        {screenSize.dynamicWidth < 1366 && <Route path='/all' element={<Users users={users} />} />}
        <Route path='/' element={<Navigate to='0' />} />
        {routes}
      </Routes>
    </div>
  )
}

export default compose(withAuthRedirect)(InboxMesssages)
