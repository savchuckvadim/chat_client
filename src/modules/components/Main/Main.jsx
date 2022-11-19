import style from './Main.module.css'
import Menu from './Chat/Menu/Menu'
import { Navigate, Route, Routes } from 'react-router-dom'

import UsersContainer from './Users/Users-Container'
import ChatContainer from './Chat/Chat-Area/Chat-Container'
import Prefences from '../Prefences/Prefences'


const ChatApp = () => {
  return (
    <div className={style.frame}>
      <div className={style.left__area}>
        <Routes>
          <Route path='*' element={<Navigate replace to='../chat' />} />
          <Route path='chat' element={<ChatContainer />}>
            <Route path=':dialogId' element={<ChatContainer />} />
          </Route>
          <Route path='profile' element={<ChatContainer />} />
          <Route path='users' element={<UsersContainer />} />
          <Route path='prefences' element={<Prefences />} />
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