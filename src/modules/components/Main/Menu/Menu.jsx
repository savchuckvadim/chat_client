import { NavLink } from 'react-router-dom'
import styleMenu from './Menu.module.css'
import styleModalMenu from './Modal-Menu.module.css'

const Menu = ({ isModal, logout = null, changeForwardingMessageStatus }) => {

  let style = !isModal ? styleMenu : styleModalMenu

  const logoutAction = () => {
    changeForwardingMessageStatus(false, '')
    logout()
  }
  const forwardingMessage = () => {
    return  isModal &&  changeForwardingMessageStatus(false, '')
  }

  return (

    <div className={style.menu}>
      <div className={style.title__wrapper}>
        <h3>Menu</h3>
      </div>

      <div className={style.items}>
        <NavLink onClick={() => { }} className={style.link} to='chat'>Чат</NavLink>
        <NavLink onClick={() => { forwardingMessage() }} className={style.link} to='users'>Пользователи</NavLink>
        <NavLink onClick={() => { forwardingMessage() }} className={style.link} to='profile'>Профиль</NavLink>
        <NavLink onClick={() => { forwardingMessage() }} className={style.link} to='prefences'>Настройки</NavLink>
        {isModal && <p className={style.link}
          onClick={() => { logoutAction() }}
        >Выйти</p>}
      </div>

    </div>

  )


}

export default Menu