export type Alert = {
  message: string;
  type: 'success' | 'error' | 'alert';
};

export type Photo = { small: string; large: string };

export type ProfileData = {
  aboutMe: string;
  contacts: string[];
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  photos: Photo;
  userId: number;
};

export type LoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

export type User = {
  name: string;
  id: number;
  uniqueUrlName: null;
  photos: {
    small: string | null;
    large: string | null;
  };
  status: string | null;
  followed: boolean;
};

export type DialogsUser = {
  id: number;
  name: string;
};

export type UserMessage = {
  id: number;
  text: string;
  from: 'me' | 'them';
};

export type NavItem = {
  id: number;
  to: string;
  name: string;
};

export type Post = {
  id: number;
  text: string;
  likes: number;
};
