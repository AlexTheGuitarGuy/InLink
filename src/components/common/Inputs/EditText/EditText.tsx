import RegularInput from '../RegularInput/RegularInput'
import React, { ChangeEvent, FC, useState } from 'react'
import { Clear, Done } from '@mui/icons-material'
import cn from 'classnames'

export enum EditTextButtonColor {
  Gray = 'gray',
  Blue = 'blue',
}

export type EditTextProps = {
  text: string
  onDone: (text: string) => void
  onClear: () => void
  textAreaClassName?: string
  buttonsColor?: EditTextButtonColor
}

const EditText: FC<EditTextProps> = ({
  text,
  onDone,
  onClear,
  textAreaClassName,
  buttonsColor = 'gray',
}) => {
  const [dynamicText, setDynamicText] = useState(text)
  let buttonsTextColor = 'text-black'
  let buttonsBackground = 'hover:bg-gray-300 active:bg-gray-400'

  switch (buttonsColor) {
    case 'gray': {
      break
    }
    case 'blue': {
      buttonsTextColor = 'text-white'
      buttonsBackground = 'hover:bg-blue-500 active:bg-blue-600'
      break
    }
  }

  return (
    <div className='text-black'>
      <RegularInput
        as='textarea'
        field={{ placeholder: 'Edit post...', className: textAreaClassName }}
        restProps={{
          onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
            setDynamicText(event.target.value)
          },
          value: dynamicText,
        }}
      />
      <div className={cn('flex justify-end mt-2', buttonsTextColor)}>
        <Done
          className={cn('cursor-pointer rounded', buttonsBackground)}
          onClick={() => onDone(dynamicText)}
        />
        <Clear
          className={cn('cursor-pointer rounded', buttonsBackground)}
          onClick={() => {
            setDynamicText(text)
            onClear()
          }}
        />
      </div>
    </div>
  )
}

export default EditText
