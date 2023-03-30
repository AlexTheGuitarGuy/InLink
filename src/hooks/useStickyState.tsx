import { useEffect, useState } from 'react'

export const useStickyState = (
  defaultValue: string | undefined,
  key: string,
): [string | undefined, (v: string) => void] => {
  const [value, setValue] = useState<string | undefined>(defaultValue)

  useEffect(() => {
    const stickyValue = localStorage.getItem(key)
    if (stickyValue !== null) {
      setValue(stickyValue)
    }
  }, [key, setValue])

  return [
    value,
    (v) => {
      localStorage.setItem(key, v)
      setValue(v)
    },
  ]
}
