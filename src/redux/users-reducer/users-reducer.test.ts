import usersPageReducer, { usersActions, UsersPageReducerState } from './users-reducer'

const state: UsersPageReducerState = {
  users: [
    {
      name: 'Riabovoleg',
      id: 1,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: false,
    },
    {
      name: 'monohrom',
      id: 2,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: false,
    },
    {
      name: 'ApatskiKirill',
      id: 25820,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: false,
    },
    {
      name: 'MrBattka',
      id: 25819,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: false,
    },
    {
      name: 'ruslanche',
      id: 25818,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: false,
    },
    {
      name: 'andreu6454',
      id: 25817,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: false,
    },
    {
      name: 'klimsanych1995',
      id: 25816,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: false,
    },
    {
      name: 'to_testt',
      id: 25815,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: false,
    },
  ],
  frontPageFriends: [],
  totalUsers: 0,
  isLoading: false,
  followQueue: [],
  currentPagesBeginning: 0,
  pageSize: 0,
}

it(`should turn follow status of user with id 2 from false to true`, () => {
  const action = usersActions.setFollowStatus(2, true)

  const newState = usersPageReducer(state, action)

  expect(newState.users?.find((e) => e.id === 2)?.followed).toBe(true)
})

it(`should add user with id 2 to follow queue`, () => {
  const action = usersActions.updateFollowQueue(2)

  const newState = usersPageReducer(state, action)

  expect(newState.followQueue.some((e) => e === 2)).toBe(true)
})

it(`should remove user with id 2 from follow queue`, () => {
  const action = usersActions.updateFollowQueue(2)

  let newState = usersPageReducer(state, action)
  newState = usersPageReducer(newState, action)

  expect(newState.followQueue.some((e) => e === 2)).toBe(false)
})
