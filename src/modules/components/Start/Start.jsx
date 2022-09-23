import { Route, Routes } from 'react-router-dom'
import LoginContainer from './Login/Login-Container'
import Registration from './Registration/Registration'
import style from './Start.module.css'

const StartPage = () => {

  return (

    <div className={style.container}>

      <div className={style.login}>
        Login
      </div>
      <div className={style.registration}>
        Registaration
      </div>


    </div>

  )
}

const  Start = () => {
  return (
    <Routes >
      <Route path='/' element={<StartPage />} />
      <Route path='login' element={<LoginContainer />} />
      <Route path='?verified=1' element={<LoginContainer />} />
      <Route path='login' element={<Registration />} />
    </Routes>
  )
}



export default Start