import profileReducer, { ProfileReducerState, profileActions } from './profile-reducer'
import { v1 as uuidv1 } from 'uuid'

const state: ProfileReducerState = {
  posts: [
    {
      id: uuidv1(),
      text: 'Hello world',
      likes: 333,
      likedByUser: false,
    },
    { id: uuidv1(), text: 'I am a coder in react!', likes: 222, likedByUser: true },
    {
      id: uuidv1(),
      text: 'I code everyday',
      likes: 111,
      likedByUser: false,
    },
  ],
} as ProfileReducerState

it(`should add a post that contains text "testing is good"`, () => {
  const action = profileActions.createPost('testing is good')

  const newState = profileReducer(state, action)

  expect(newState.posts.length).toBe(4)
  expect(newState.posts[3].text).toBe('testing is good')
})

it(`should delete post with id 3`, () => {
  const action = profileActions.deletePost('3')

  const newState = profileReducer(state, action)

  expect(newState.posts.find((p) => p.id === '3')).toBe(undefined)
})

it(`should edit post with id 3 to be "I also like Jest!"`, () => {
  const action = profileActions.editPost('3', 'I also like Jest')

  const newState = profileReducer(state, action)

  expect(newState.posts.find((p) => p.id === '3')?.text).toBe('I also like Jest')
})
