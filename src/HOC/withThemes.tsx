import React, { ComponentType } from 'react'
import { useStickyState } from '../hooks/useStickyState'

export const colors = ['blue', 'green', 'red']
export const modes = ['light', 'dark']

function withThemes<P extends Object>(Component: ComponentType<P>) {
  return (props: P) => {
    const [color] = useStickyState(colors[0], 'theme-color')
    const [mode] = useStickyState(modes[1], 'theme-mode')

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
