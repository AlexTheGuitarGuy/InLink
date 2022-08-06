import { useEffect, useRef } from 'react';

const useTagBlur = (flag, setFlag) => {
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
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
