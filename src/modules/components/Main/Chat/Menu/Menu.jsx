import { NavLink } from 'react-router-dom'
import style from './Menu.module.css'

const Menu = () => {

  return (

    <div className={style.menu}>
      <h3>Menu</h3>
      <div className={style.container}>
        <NavLink className={style.link} to='chat'>Чат</NavLink>
        <NavLink className={style.link} to='profile'>Профиль</NavLink>
        <NavLink className={style.link} to='users'>Пользователи</NavLink>
        <NavLink className={style.link} to='prefences'>Настройки</NavLink>
      </div>

    </div>

  )
}

export default Menu