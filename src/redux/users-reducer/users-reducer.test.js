import usersPageReducer, { toggleFollowStatus, updateFollowQueue } from './users-page-reducer';

const state = {
  users: [
    {
      id: 1,
      name: ['Boy', 'Next-door'],
      bio: "Get up you lazy cow. Where's my breakfast?",
      location: { country: 'Belarus', city: 'Minsk' },
      followed: false,
      /* pfp: (
        <img
          src={require('../../redux/photos/UsersPfp/u1.png')}
          alt="User1 pfp"
        />
      ), */
    },
    {
      id: 2,
      name: ['Fucking', 'Slave'],
      bio: 'LIKE EMBARRASSING ME, HUH?',
      location: { country: 'Ukraine', city: 'Kivy' },
      followed: false,
      /* pfp: (
        <img
          src={require('../../redux/photos/UsersPfp/u2.jpg')}
          alt="User2 pfp"
        />
      ), */
    },
    {
      id: 3,
      name: ['Boss', 'Of This Gym'],
      bio: "Ok maggots i wanna see six hot loads on your di's hat, now",
      location: { country: 'Japan', city: 'Tokyo' },
      followed: false,
      /* pfp: (
        <img
          src={require('../../redux/photos/UsersPfp/u3.jpg')}
          alt="User3 pfp"
        />
      ), */
    },
    {
      id: 4,
      name: ['Dungeon', 'Master'],
      bio: "I'm an artist. I'm a performance artist.",
      location: { country: 'United states', city: 'Los Angeles' },
      followed: false,
      /* pfp: (
        <img
          src={require('../../redux/photos/UsersPfp/u4.jpg')}
          alt="User4 pfp"
        />
      ), */
    },
  ],
  pageSize: 5,
  page: 1,
  totalUsers: 0,
  currentPagesBeginning: 1,
  isLoading: false,
  followQueue: [],
};

it(`should turn follow status of user with id 2 from false to true`, () => {
  const action = toggleFollowStatus(2, true);

  const newState = usersPageReducer(state, action);

  expect(newState.users.find((e) => e.id === 2).followed).toBe(true);
});

it(`should add user with id 2 to follow queue`, () => {
  const action = updateFollowQueue(2);

  const newState = usersPageReducer(state, action);

  expect(newState.followQueue.some((e) => e === 2)).toBe(true);
});

it(`should remove user with id 2 from follow queue`, () => {
  const action = updateFollowQueue(2);

  let newState = usersPageReducer(state, action);
  newState = usersPageReducer(newState, action);

  expect(newState.followQueue.some((e) => e === 2)).toBe(false);
});
