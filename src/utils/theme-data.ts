import { THEME_MODE_KEY, THEME_COLOR_KEY } from '../constants/local-storage'

export enum Color {
  blue = 'blue',
  green = 'green',
  purple = 'purple',
}

export enum Mode {
  dark = 'dark',
  light = 'light',
}

export type ThemeData = { mode: Mode; color: Color }

export const getThemeData = (): ThemeData => {
  const color = localStorage.getItem(THEME_COLOR_KEY) as Color | null
  const mode = localStorage.getItem(THEME_MODE_KEY) as Mode | null

  return {
    mode: mode || Mode.dark,
    color: color || Color.blue,
  }
}

export const setThemeData = (data: ThemeData) => {
  const { mode, color } = data

  localStorage.setItem(THEME_MODE_KEY, mode)
  localStorage.setItem(THEME_COLOR_KEY, color)
}
