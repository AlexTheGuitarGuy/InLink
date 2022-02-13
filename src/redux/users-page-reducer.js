const CHANGE_FOLLOW_STATUS = 'CHANGE-FOLLOW-STATUS';
const SET_USERS = 'SET-USERS';

let defaultState = {
  users: [
    /*
    {
      id: 1,
      name: ['Boy', 'Nextdoor'],
      bio: "Get up you lazy cow. Where's my breakfast?",
      location: { country: 'Belarus', city: 'Minsk' },
      isFollowing: true,
      pfp: (
        <img
          src={require('../../redux/photos/UsersPfp/u1.jpg')}
          alt="User1 pfp"
        />
      ),
    },
    {
      id: 2,
      name: ['Fucking', 'Slave'],
      bio: 'LIKE EMBARRASSING ME, HUH?',
      location: { country: 'Ukraine', city: 'Kyiv' },
      isFollowing: false,
      pfp: (
        <img
          src={require('../../redux/photos/UsersPfp/u2.png')}
          alt="User2 pfp"
        />
      ),
    },
    {
      id: 3,
      name: ['Boss', 'Of This Gym'],
      bio: "Ok maggots i wanna see six hot loads on your di's hat, now",
      location: { country: 'Japan', city: 'Tokyo' },
      isFollowing: true,
      pfp: (
        <img
          src={require('../../redux/photos/UsersPfp/u3.jpg')}
          alt="User3 pfp"
        />
      ),
    },
    {
      id: 4,
      name: ['Dungeon', 'Master'],
      bio: "I'm an artist. I'm a performance artist.",
      location: { country: 'United states', city: 'Los Angeles' },
      isFollowing: false,
      pfp: (
        <img
          src={require('../../redux/photos/UsersPfp/u4.jpg')}
          alt="User4 pfp"
        />
      ),
    },
  */
  ],
};

const usersPageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_FOLLOW_STATUS:
      return {
        ...state,
        users: state.users.map((e) => {
          if (e.id === action.id) e.isFollowing = !e.isFollowing;
          return e;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    default:
      return state;
  }
};

export const changeFollowStatusAC = (id) => ({
  type: CHANGE_FOLLOW_STATUS,
  id,
});
export const setUsersAC = (users) => ({ type: SET_USERS, users });

export default usersPageReducer;
