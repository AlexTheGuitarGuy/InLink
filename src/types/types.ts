export type AlertType = {
  text: string;
  type: 'success' | 'error' | 'alert';
};

export type PhotoType = { small: string; large: string };

export type ProfileDataType = {
  aboutMe: string;
  contacts: string[];
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  photos: PhotoType;
  userId: number;
};

export type LoginPayloadType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};
