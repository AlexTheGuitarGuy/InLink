import { ComponentType } from 'react'
import { useStickyState } from '../hooks/useStickyState'

export enum Color {
  blue = 'blue',
  green = 'green',
  purple = 'purple',
}

export enum Mode {
  dark = 'dark',
  light = 'light',
}

function withThemes<P extends Object>(Component: ComponentType<P>) {
  return (props: P) => {
    const [color] = useStickyState(Object.values(Color)[0], 'theme-color')
    const [mode] = useStickyState(Object.values(Mode)[0], 'theme-mode')

    return (
      <div
        className={[color && `theme-${color}`, mode && `theme-${mode}`].filter(Boolean).join(' ')}
      >
        <Component {...props} />
      </div>
    )
  }
}
export default withThemes
