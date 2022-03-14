import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'b27ac241-a89b-4b50-8a5d-bba60c6cfbd1',
  },
});

export const userAPI = {
  getUsers: (page = 1, pageSize = 10) => {
    return instance
      .get(`users?page=${page}&count=${pageSize}`)
      .then((response) => response.data);
  },

  unfollow: (id) => {
    return instance
      .delete(
        `https://social-network.samuraijs.com/api/1.0/follow/${id}`,
      )
      .then((response) => response.data);
  },

  follow: (id) => {
    return instance
      .post(
        `https://social-network.samuraijs.com/api/1.0/follow/${id}`,
      )
      .then((response) => response.data);
  },

  auth: () => {
    return instance
      .get('https://social-network.samuraijs.com/api/1.0/auth/me')
      .then((response) => response.data);
  },

  loadProfile: (uid) => {
    return instance
      .get(`profile/${uid}`)
      .then((response) => response.data);
  },
};
