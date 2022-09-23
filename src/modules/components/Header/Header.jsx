import style from './Header.module.css'
import logo from '../../../logo.svg';
import { authApi } from '../../services/api';
import { useState } from 'react';


const Header = (props) => {
  const logout = () => {
    props.logout()
  }
  const [logoStyle, setLogoStyle] = useState(style.App__logo)

  const clickBrand = () => {
    if (logoStyle === style.App__logo) {
      setLogoStyle(style.App__logo__stop)
    } else {
      setLogoStyle(style.App__logo)
    }
  }

  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.brand__wrapper} onClick={() => { clickBrand() }}>
          <img

            src={logo} className={logoStyle} alt="logo" />
          <div className={style.brand}>Chat</div>
        </div>
        {props.isAuth && <button className={style.logout} onClick={() => { logout() }}>logout</button>}

      </div>

    </header>
  )
}

export default Header