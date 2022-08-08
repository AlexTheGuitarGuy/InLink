import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAlert } from '../../redux/app-selector';
import cn from 'classnames';

const Alert = () => {
  const [isShown, setIsShown] = useState(false);

  const alert = useSelector(getAlert);
  const { type, message } = alert;

  useEffect(() => {
    message && setIsShown(true);
  }, [alert]);

  const timeoutRef = useRef();
  useEffect(() => {
    timeoutRef.current = setTimeout(() => setIsShown(false), 5000);
    return () => {
      clearInterval(timeoutRef.current);
    };
  }, [alert]);

  let alertTitle;
  switch (type) {
    case 'error':
      alertTitle = 'An error has occurred:';
      break;
    case 'success':
      alertTitle = 'Operation successful:';
      break;
    default:
      alertTitle = 'Message:';
  }

  return (
    <div className="w-full fixed z-20 flex justify-end right-4">
      <div
        className={cn(
          `w-1/3 px-4 py-3 
          rounded
          transition-opacity
          absolute`,
          { 'bg-red-100 border border-red-400 text-red-700': type === 'error' },
          { 'bg-green-100 border border-green-400 text-green-700': type === 'success' },
          { 'bg-yellow-100 border border-yellow-400 text-yellow-700': !type },
          { 'opacity-100': isShown },
          { 'opacity-0 pointer-events-none': !isShown },
        )}
        role="alert"
      >
        <strong className="font-bold">{alertTitle}</strong>
        <span className="ml-2 block sm:inline">{message}</span>
      </div>
    </div>
  );
};

export default Alert;
