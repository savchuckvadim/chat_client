import style from './Main.module.css'
import Menu from './Chat/Menu/Menu'
import { Navigate, Route, Routes } from 'react-router-dom'
import Chat from './Chat/Chat-Area/Chat'
import UsersContainer from './Users/Users-Container'


const ChatApp = () => {
  return (
    <div className={style.container}>
      <div className={style.left__area}>
        <Routes>
        <Route path='*' element={<Navigate replace to='../chat' />} />
          <Route path='chat' element={<Chat />} />
          <Route path='profile' element={<Chat />} />
          <Route path='users' element={<UsersContainer />} />
          <Route path='prefences' element={<Chat />} />
        </Routes>
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
      {/* {<Navigate replace to='/chat' />} */}
      <Routes>
        {/* <Route path="*" element={<Navigate to="chat" replace />} /> */}

        <Route path='*' element={<ChatApp />} />

      </Routes>

    </main>
  )
}

export default Main