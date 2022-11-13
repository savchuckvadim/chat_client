import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import LoginContainer from './Login/Login-Container'
import RegistrationContainer from './Registration/Registration-Container'
import style from './Start.module.css'

const StartPage = () => {

  return (


    <div className={style.container}>
      <div className={style.button__wrapper}>
        <NavLink to='login'>
          <button className={style.button}>
            Login
          </button>
        </NavLink>
      </div>
      <div className={style.button__wrapper}>
        <NavLink to='registration'>
          <button className={style.button}>
            Registration
          </button>
        </NavLink>
      </div>


    </div>

  )
}

const Start = (props) => {
  debugger
  if (props.registrationStatus) {
    debugger
    return <Navigate replace to={`../chat`} />
  } else {
    return (
      <Routes >
        <Route path='*' element={<Navigate replace to='../' />} />
        <Route path='/' element={<StartPage />} />
        <Route path='login' element={<LoginContainer />} />
        <Route path='registration' element={<RegistrationContainer />} />
      </Routes>
    )
  }

}



export default Start