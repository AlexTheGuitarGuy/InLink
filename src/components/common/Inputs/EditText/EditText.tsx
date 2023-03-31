import { Clear, Done } from '@mui/icons-material'
import cn from 'classnames'
import { ChangeEvent, FC, useState } from 'react'
import RegularInput from '../RegularInput/RegularInput'

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
  let buttonsTextColor = ''
  let buttonsBackground = ''

  switch (buttonsColor) {
    case EditTextButtonColor.neutral: {
      buttonsBackground = 'hover:bg-neutralBg'
      break
    }
    case EditTextButtonColor.primary: {
      buttonsBackground = 'hover:bg-primaryChild'
      break
    }
  }

  return (
    <div>
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
      <div className={cn('flex justify-end mt-2 bg-neutral', buttonsTextColor)}>
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
