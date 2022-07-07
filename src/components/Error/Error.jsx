import React, { useEffect } from 'react';
import cn from 'classnames';

const Error = ({ text, isShown, setIsShown }) => {
  useEffect(() => {
    setTimeout(() => setIsShown(false), 5000);
  });

  return (
    <div className="w-full fixed z-20 flex justify-end right-4">
      <div
        className={cn(
          `w-1/3 px-4 py-3
                bg-red-100
                border border-red-400
                text-red-700
                rounded
                transition-opacity
                absolute`,
          { 'opacity-100': isShown },
          { 'opacity-0': !isShown },
        )}
        role="alert"
      >
        <strong className="font-bold">An error has occurred:</strong>
        <span className="ml-2 block sm:inline">{text}</span>
      </div>
    </div>
  );
};

export default Error;
