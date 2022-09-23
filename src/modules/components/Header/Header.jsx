import style from './Header.module.css'
import logo from '../../../logo.svg';
import { authApi } from '../../services/api';


const Header = (props) => {
  const onClick = () => {
    authApi.logout()
  }

  
  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.brand__wrapper}>
          <img src={logo} className={style.App__logo} alt="logo" />
          <div className={style.brand}>Chat</div>
        </div>
        {props.isAuth && <button className={style.logout} onClick={() => { onClick() }}>logout</button>}

      </div>

    </header>
  )
}

export default Header