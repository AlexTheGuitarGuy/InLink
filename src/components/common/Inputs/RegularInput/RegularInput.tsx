import { FC } from 'react'
import cn from 'classnames'

type RegularInputProps = {
  field: {
    type?: string
    name?: string
    placeholder: string
    className?: string
  }
  label?: {
    text: string
    className?: string
  }
  as: 'input' | 'textarea'
  restProps?: any
}

const RegularInput: FC<RegularInputProps> = ({
  field: { type = 'text', ...field },
  label,
  as = 'input',
  restProps,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={label.text} className={label.className}>
          {label.text}
        </label>
      )}
      {as === 'input' && (
        <input
          {...field}
          type={type}
          {...restProps}
          className={cn(
            `rounded 
                    border border-onNeutralBg border-solid
                    focus:outline-none focus:ring-2 focus:ring-primary
                    transition ease-in-out
                    bg-clip-padding
                    px-3 py-2 w-full`,
            field.className,
          )}
        />
      )}
      {as === 'textarea' && (
        <textarea
          {...field}
          className={cn(
            `rounded 
                    border border-onNeutralBg border-solid
                    focus:outline-none focus:ring-2 focus:ring-primary
                    transition ease-in-out`,
            field.className,
          )}
          {...restProps}
        />
      )}
    </>
  )
}
export default RegularInput
