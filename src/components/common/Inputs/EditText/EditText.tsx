import RegularInput from '../RegularInput/RegularInput'
import React, { ChangeEvent, FC, useState } from 'react'
import { Clear, Done } from '@mui/icons-material'
import cn from 'classnames'

export enum EditTextButtonColor {
  neutral = 'neutral',
  primary = 'primary',
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
  buttonsColor = EditTextButtonColor.neutral,
}) => {
  const [dynamicText, setDynamicText] = useState(text)
  let buttonsTextColor = 'text-black'
  let buttonsBackground = 'hover:bg-neutral-300 active:bg-neutral-400'

  switch (buttonsColor) {
    case EditTextButtonColor.neutral: {
      break
    }
    case EditTextButtonColor.primary: {
      buttonsTextColor = 'text-white'
      buttonsBackground = 'hover:bg-primary'
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
