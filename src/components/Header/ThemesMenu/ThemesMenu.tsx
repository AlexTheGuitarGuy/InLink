import { Settings } from '@mui/icons-material'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { Color, Mode } from '@/utils/theme-data'
import useTagBlur from '@/hooks/useTagBlur'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getThemeFromStore } from '@/redux/app-reducer/app-selector'
import { appActions } from '@/redux/app-reducer/app-reducer'

const ThemesMenu = () => {
  const themeData = useAppSelector(getThemeFromStore)

  const [color, setColor] = useState(themeData.color)
  const [mode, setMode] = useState(themeData.mode)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(appActions.setTheme({ color, mode }))
  }, [color, mode, dispatch])

  const [showThemesMenu, setShowThemesMenu] = useState(false)

  const ref = useTagBlur<HTMLDivElement>(showThemesMenu, setShowThemesMenu)
  return (
    <>
      <div
        className={cn(
          `fixed right-16 top-16 
            p-8
            bg-neutralBg border border-t-0 border-onNeutralBg transition-opacity
            flex flex-col items-center space-y-4 rounded-b-md font-semibold`,
          {
            'opacity-0 pointer-events-none': !showThemesMenu,
          },
        )}
        ref={ref}
      >
        <span>Themes</span>
        <div className='flex'>
          {Object.values(Color).map((colorItem) => (
            <button
              key={colorItem}
              onClick={() => setColor(colorItem)}
              className={cn(
                'rounded-full w-10 h-10 transition-colors flex justify-center items-center',
                {
                  'bg-neutralChild': colorItem === color,
                },
              )}
            >
              <div
                className={cn(`w-8 h-8 rounded-full`, {
                  'bg-purple-500': colorItem === 'purple',
                  'bg-green-500': colorItem === 'green',
                  'bg-blue-500': colorItem === 'blue',
                })}
              ></div>
            </button>
          ))}
        </div>
        <div className='flex space-x-3'>
          <label htmlFor='modeSwitch'>Light</label>
          <button
            className='w-16 rounded-full p-1 bg-neutralChild flex items-center'
            id='modeSwitch'
            onClick={() => setMode(mode === Mode.light ? Mode.dark : Mode.light)}
          >
            <div
              className={cn('rounded-full w-4 h-4 bg-primaryBg transition-transform', {
                'translate-x-10': mode === 'dark',
              })}
            ></div>
          </button>
          <label htmlFor='modeSwitch'>Dark</label>
        </div>
      </div>

      <button
        onClick={() => setShowThemesMenu(!showThemesMenu)}
        className={cn('transition-all flex items-center justify-center', {
          'rotate-90': showThemesMenu,
        })}
      >
        <Settings />
      </button>
    </>
  )
}

export default ThemesMenu
