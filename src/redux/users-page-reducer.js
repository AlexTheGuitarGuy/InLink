const TOGGLE_FOLLOW_STATUS = 'CHANGE-FOLLOW-STATUS';
const SET_USERS = 'SET-USERS';
const SET_PAGE = 'SET-PAGE';
const SET_USERS_NB = 'SET-USERS-NB';
const SET_CURRENT_PAGES = 'SET-CURRENT-PAGES';
const TOGGLE_LOADING = 'TOGGLE-LOADING';

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
  pageSize: 5,
  page: 1,
  totalUsers: 0,
  currentPagesBeginning: 1,
  isLoading: false,
};

const usersPageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_FOLLOW_STATUS:
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
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case SET_USERS_NB:
      return {
        ...state,
        totalUsers: action.totalUsers,
      };
    case SET_CURRENT_PAGES:
      return {
        ...state,
        currentPagesBeginning: action.newBeginning,
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    default:
      return state;
  }
};

export const changeFollowStatus = (id) => ({
  type: TOGGLE_FOLLOW_STATUS,
  id,
});
export const setUsers = (users) => ({ type: SET_USERS, users });

export const setPage = (page) => ({ type: SET_PAGE, page });

export const setTotalUsers = (totalUsers) => ({
  type: SET_USERS_NB,
  totalUsers,
});

export const setCurrentPages = (newBeginning) => ({
  type: SET_CURRENT_PAGES,
  newBeginning,
});

export const toggleLoading = () => ({
  type: TOGGLE_LOADING,
});

export default usersPageReducer;
