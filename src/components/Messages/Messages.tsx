import React, { ReactNode, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router'
import { compose } from 'redux'
import { useSelector } from 'react-redux'

import { getUserMessages } from '../../redux/dialogs-reducer/dialogs-selector'
import { getFrontPageFriends } from '../../redux/users-reducer/users-selector'
import { getMyData } from '../../redux/profile-reducer/profile-selector'

import withAuthRedirect from '../../HOC/withAuthRedirect'
import useScreenSize from '../../hooks/useScreenSize'

import { UserMessage as UserMessageType } from '../../types/types'

import UserMessage from './UserMessage/UserMessage'
import Users from './Users/Users'
import MessageForm from './MessagesForm/MessagesForm'
import Loading from '../common/Loading/Loading'
import { dialogsActions } from '../../redux/dialogs-reducer/dialogs-reducer'
import { useAppDispatch } from '../../hooks/reduxHooks'

const Messages = () => {
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
        message={message}
        conversationIndex={conversationIndex}
        users={users}
        array={array}
        index={index}
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
          <div className='flex flex-col h-full w-full relative overflow-y-scroll overflow-x-hidden'>
            <div className='space-y-1 h-[78vh]'>{conversationComponents[index]}</div>
            <div
              className='fixed bottom-0 lg:w-3/5 sm:w-full self-center
              pb-4 rounded-t px-2 py-2 bg-gray-300'
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
         lg:bg-gray-100 lg:rounded-lg lg:p-8
         text-gray-700 lg:font-semibold
         xl:h-[92vh] lg:h-[88vh] w-full'
    >
      {screenSize.dynamicWidth >= 1366 && <Users users={users} />}

      <Routes>
        {screenSize.dynamicWidth < 1366 && <Route path='/all' element={<Users users={users} />} />}
        <Route path='/' element={<Navigate to={'0'} />} />
        {routes}
      </Routes>
    </div>
  )
}

export default compose(withAuthRedirect)(Messages)
