import style from './Header.module.css'
import logo from '../../../logo.svg';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


const Header = (props) => {
  const logout = () => {
    props.logout()

  }
  // useEffect(() => {
  //   logout()
  // })
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
      <div className={style.frame}>
        <div className={style.brand__wrapper} onClick={() => { clickBrand() }}>
          <img

            src={logo} className={logoStyle} alt="logo" />
          <div className={style.brand}>
            <h1 key={'brand'} > Chat</h1>
          </div>
        </div>
        {props.isAuth && <button className={style.logout} onClick={() => { logout() }}>logout</button>}
        {props.isAuth && <button className={style.burger__button} onClick={() => { logout() }}>###</button>}
      </div>

    </header>
  )
}

export default Header