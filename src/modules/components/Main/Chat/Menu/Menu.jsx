import { NavLink } from 'react-router-dom'
import styleMenu from './Menu.module.css'
import styleModalMenu from './Modal-Menu.module.css'

const Menu = (props) => {

  let style = !props.isModal ? styleMenu : styleModalMenu


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