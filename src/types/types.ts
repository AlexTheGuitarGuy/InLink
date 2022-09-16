import { FormikErrors } from 'formik';

export type Alert = {
  message: string;
  type: 'success' | 'error' | 'alert';
};

export type Photo = { small: string; large: string };

export type ContactsObj = {
  facebook: string;
  github: string;
  instagram: string;
  mainLink: string;
  twitter: string;
  vk: string;
  website: string;
  youtube: string;
};

export type InputProfileData = {
  aboutMe: string;
  contacts: ContactsObj;
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
};

export type ProfileData = {
  photos: Photo;
  userId: number;
} & InputProfileData;

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
  avatar: string;
  name: string;
};

export type UserMessage = {
  name?: string;
  type: 'sent' | 'received';
  text: string;
  avatar?: string;
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

export type FormikStatus = {
  error: FormikErrors<InputProfileData>;
};

export type GetUsersResponse = {
  items: User[];
  totalCount: number;
  error?: string;
};

export type GetCaptchaURLResponse = {
  url: string;
};

export type CommonResponse<D> = {
  resultCode: ResultCodes | ResultCodesWithCaptcha;
  messages: string[];
  data: D;
};

export enum ResultCodes {
  Success = 0,
  Error = 1,
}

export enum ResultCodesWithCaptcha {
  CaptchaRequired = 10,
}

export type Nullable<T> = T | null;
