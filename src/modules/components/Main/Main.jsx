import CurrentDialog from './Chat/Chat-Area/Current-Dialog/Current-Dialog'
import Dialogs from './Chat/Chat-Area/Dialogs/Dialogs'
import style from './Main.module.css'
import Menu from './Chat/Menu/Menu'
import { Navigate, Route, Routes } from 'react-router-dom'

const ChatApp = () => {
  return (
    <div className={style.container}>
      <div className={style.dialogs}>
        <Dialogs />
      </div>
      <div className={style.currentDialog}>
        <CurrentDialog />
      </div>
      <div className={style.menu}>
        <Menu />
      </div>
    </div>
  )
}
const Main = () => {

  return (
    <main>
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path='/' element={<ChatApp />} />
      </Routes>

    </main>
  )
}

export default Main