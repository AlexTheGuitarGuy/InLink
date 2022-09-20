import { getIsSidebarHidden } from '../../redux/app-reducer/app-selector';
import { useSelector } from 'react-redux';
import cn from 'classnames';

const PageNotFound = () => {
  const isSidebarHidden = useSelector(getIsSidebarHidden);
  return (
    <div
      className={cn(
        `flex justify-center items-center mt-96 
                                text-9xl
                                font-semibold text-gray-700`,
        { '-ml-14': !isSidebarHidden },
      )}
    >
      404
    </div>
  );
};

export default PageNotFound;
