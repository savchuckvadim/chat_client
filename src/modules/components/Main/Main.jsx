import CurrentDialog from './Chat/Chat-Area/Current-Dialog/Current-Dialog'
import Dialogs from './Chat/Chat-Area/Dialogs/Dialogs'
import style from './Main.module.css'
import Menu from './Chat/Menu/Menu'
import { Navigate, Route, Routes } from 'react-router-dom'
import Chat from './Chat/Chat-Area/Chat'
import Users from './Users/Users'


const ChatApp = () => {
  return (
    <div className={style.container}>
      <Routes>
      {/* <Route path='/' element={<Chat />} /> */}
        <Route path='chat' element={<Chat />} />
        <Route path='profile' element={<Chat />} />
        <Route path='users' element={<Users />} />
        <Route path='prefences' element={<Chat />} />
      </Routes>

      <div className={style.menu}>
        <Menu />
      </div>
    </div>
  )
}
const Main = () => {

  return (
    <main>
      {/* {<Navigate replace to='/chat' />} */}
      <Routes>
        {/* <Route path="*" element={<Navigate to="chat" replace />} /> */}
       
        <Route path='*' element={<ChatApp />}/>
       
      </Routes>

    </main>
  )
}

export default Main