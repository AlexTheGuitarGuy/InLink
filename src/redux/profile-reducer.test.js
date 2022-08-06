import profileReducer, { deletePost, editPost, post } from './profile-reducer';

const state = {
  posts: [
    {
      id: 1,
      text: 'I like coding in React!',
      likes: 333,
    },
    { id: 2, text: 'I really do', likes: 222 },
    {
      id: 3,
      text: 'Especially when everything is already done on stack overflow',
      likes: 111,
    },
  ],
  profileData: null,
  profileStatus: null,
  isLoading: false,
};

it('should increment posts array length', () => {
  const action = post('testing is good');

  const newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(4);
});

it(`should add a post that contains text "testing is good"`, () => {
  const action = post('testing is good');

  const newState = profileReducer(state, action);

  expect(newState.posts[3]).toBe('testing is good');
});

it(`should delete post with id 3`, () => {
  const action = deletePost(3);

  const newState = profileReducer(state, action);

  expect(newState.posts.find((p) => p.id === 3)).toBe(undefined);
});

it(`should edit post with id 3 to be "I also like Jest!"`, () => {
  const action = editPost(3, 'I also like Jest');

  const newState = profileReducer(state, action);

  expect(newState.posts.find((p) => p.id === 3).text).toBe('I also like Jest');
});
