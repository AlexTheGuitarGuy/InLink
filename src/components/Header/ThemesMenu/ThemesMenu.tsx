import { Settings } from '@mui/icons-material'
import cn from 'classnames'
import { useState } from 'react'
import { Color, Mode } from '../../../HOC/withThemes'
import { useStickyState } from '../../../hooks/useStickyState'
import useTagBlur from '../../../hooks/useTagBlur'

const ThemesMenu = () => {
  const [color, setColor] = useStickyState(Object.values(Color)[0], 'theme-color')
  const [mode, setMode] = useStickyState(Object.values(Mode)[0], 'theme-mode')

  const [showThemesMenu, setShowThemesMenu] = useState(false)

  const [anythingChanged, setAnythingChanged] = useState(false)
  const changeColor = (color: Color) => {
    setColor(color)
    setAnythingChanged(true)
  }
  const changeMode = (mode: Mode) => {
    setMode(mode)
    setAnythingChanged(true)
  }

  const ref = useTagBlur(showThemesMenu, setShowThemesMenu)
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
        ref={ref as any}
      >
        <span>Themes</span>
        <div className='flex'>
          {Object.values(Color).map((colorItem) => (
            <button
              key={colorItem}
              onClick={() => changeColor(colorItem)}
              className={cn(
                'rounded-full w-10 h-10 transition-colors flex justify-center items-center',
                {
                  'bg-neutralChild': colorItem === color,
                },
              )}
            >
              <div
                className={cn(`w-8 h-8 rounded-full`, {
                  'bg-red-500': colorItem === 'red',
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
            onClick={() => changeMode(mode === Mode.light ? Mode.dark : Mode.light)}
          >
            <div
              className={cn('rounded-full w-4 h-4 bg-primaryBg transition-transform', {
                'translate-x-10': mode === 'dark',
              })}
            ></div>
          </button>
          <label htmlFor='modeSwitch'>Dark</label>
        </div>
        {anythingChanged && <small className='text-onPrimaryBg'>please reload the page</small>}
      </div>

      <button onClick={() => setShowThemesMenu(!showThemesMenu)} className={cn('transition-all flex items-center justify-center', {'rotate-90': showThemesMenu})}>
        <Settings />
      </button>
    </>
  )
}

export default ThemesMenu
