import { FormikErrors } from 'formik'

export interface EnumObject {
  [enumValue: number | string]: string
}

export type Alert = {
  message: string
  type: 'success' | 'error' | 'alert'
}

export type Photo = { small: string; large: string }

export type ContactsObj = {
  facebook: string
  github: string
  instagram: string
  mainLink: string
  twitter: string
  vk: string
  website: string
  youtube: string
}

export type InputProfileData = {
  id: number
  aboutMe: string
  contacts: ContactsObj
  fullName: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
}

export type User = {
  name: string
  id: number
  uniqueUrlName: null
  photos: {
    small: string | null
    large: string | null
  }
  status: string | null
  followed: boolean
}

export type LoginPayload = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

export type DialogsUser = {
  avatar: string
  name: string
}

export type UserMessage = {
  id: string
  type: 'sent' | 'received'
  text: string
}

export type Post = {
  id: string
  text: string
  likes: number
  likedByUser: boolean
}

export type FormikStatus = {
  error: FormikErrors<InputProfileData>
}
