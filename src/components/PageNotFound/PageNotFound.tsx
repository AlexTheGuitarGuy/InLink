import cn from 'classnames'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { getIsSidebarHidden } from '../../redux/app-reducer/app-selector'
import { useAppSelector } from 'hooks/reduxHooks'

const PageNotFound = () => {
  const isSidebarHidden = useAppSelector(getIsSidebarHidden)
  return (
    <div
      className='lg:bg-neutralBg lg:rounded-lg
                  p-8 h-[88vh]'
    >
      <div
        className={cn(
          `flex flex-col justify-center items-center h-full
          text-9xl
          font-semibold
          `,
          { '-ml-14': !isSidebarHidden },
        )}
      >
        <WarningAmberIcon fontSize='inherit' />
        <div className='mr-8 text-5xl'>404 Not Found</div>
      </div>
    </div>
  )
}

export default PageNotFound
