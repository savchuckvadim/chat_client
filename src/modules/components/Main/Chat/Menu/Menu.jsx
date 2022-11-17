import { NavLink } from 'react-router-dom'
import style from './Menu.module.css'

const Menu = () => {

  return (

    <div className={style.menu}>
      <div className={style.title__wrapper}>
      <h3>Menu</h3>
      </div>
      
      <div className={style.items}>
        <NavLink className={style.link} to='chat'>Чат</NavLink>
        <NavLink className={style.link} to='profile'>Профиль</NavLink>
        <NavLink className={style.link} to='users'>Пользователи</NavLink>
        <NavLink className={style.link} to='prefences'>Настройки</NavLink>
      </div>

    </div>

  )
}

export default Menu