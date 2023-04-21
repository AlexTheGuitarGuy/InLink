import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAlert } from '../../redux/app-reducer/app-selector'
import Alert from './Alert'

const AlertContainer = () => {
  const alert = useSelector(getAlert)
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    alert.message && setIsShown(true)
  }, [alert, alert.message])

  useEffect(() => {
    const timeOut = setTimeout(() => setIsShown(false), 3000)
    return () => {
      clearTimeout(timeOut)
    }
  }, [alert])

  return <Alert alert={alert} isShown={isShown} />
}

export default AlertContainer
