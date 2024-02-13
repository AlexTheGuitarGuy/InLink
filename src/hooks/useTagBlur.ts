import { useEffect, useRef } from 'react'

const useTagBlur = <TRef extends HTMLElement = HTMLElement>(
  flag: boolean,
  setFlag: (newFlag: boolean) => void,
) => {
  const ref = useRef<TRef>(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node) && flag) {
        setFlag(false)
      }
    }

    document.addEventListener('mouseup', handleClickOutside)
    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [ref, flag, setFlag])

  return ref
}

export default useTagBlur
