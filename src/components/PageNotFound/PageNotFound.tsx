import cn from 'classnames'
import { getIsSidebarHidden } from '../../redux/app-reducer/app-selector'
import { useAppSelector } from 'hooks/reduxHooks'

const PageNotFound = () => {
  const isSidebarHidden = useAppSelector(getIsSidebarHidden)
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
