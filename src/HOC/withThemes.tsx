import { useAppSelector } from 'hooks/reduxHooks'
import { ComponentType } from 'react'
import { getThemeFromStore } from 'redux/app-reducer/app-selector'

function withThemes<P extends Object>(Component: ComponentType<P>) {
  return (props: P) => {
    const { color, mode } = useAppSelector(getThemeFromStore)

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
