import cn from 'classnames'
import { useSelector } from 'react-redux'
import { getIsSidebarHidden } from '../../redux/app-reducer/app-selector'

const PageNotFound = () => {
  const isSidebarHidden = useSelector(getIsSidebarHidden)
  return (
    <div
      className={cn(
        `flex justify-center items-center mt-96 
                                text-9xl
                                font-semibold`,
        { '-ml-14': !isSidebarHidden },
      )}
    >
      404
    </div>
  )
}

export default PageNotFound
