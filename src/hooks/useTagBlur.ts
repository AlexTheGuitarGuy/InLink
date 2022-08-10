import { useEffect, useRef, Ref } from 'react';

const useTagBlur = (flag: boolean, setFlag: any) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target) && flag) {
        setFlag(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, flag, setFlag]);

  return ref;
};

export default useTagBlur;
