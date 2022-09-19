import style from './Header.module.css'
import logo from '../../logo.svg';
const Header = () => {

  return (
    <header className={style.header}>
      <img src={logo} className={style.App__logo} alt="logo" />
      <div className='header__container'>Chat</div>
    </header>
  )
}

export default Header