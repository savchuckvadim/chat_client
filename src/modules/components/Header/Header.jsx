import style from './Header.module.css'
import logo from '../../../logo.svg';
import { authApi } from '../../services/api';


const Header = () => {
  const onClick = () => {
    authApi.logout()
  }
  return (
    <header className={style.header}>
      <img src={logo} className={style.App__logo} alt="logo" />
      <div className='header__container'>Chat</div>
      <button onClick={() => {onClick()}}>logout</button>
    </header>
  )
}

export default Header