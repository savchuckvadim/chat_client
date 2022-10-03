import { NavLink } from 'react-router-dom'
import style from './Dialog-Item.module.css'

const DialogItem = ({ dialog }) => {

    return (
        <NavLink to='34'>
            <div className={style.item}>
                <div className={style.avatar}>
                    <p className={style.initials}>CT</p>
                </div>
                <div className={style.text__wrapper}>
                    <h3 className={style.name}>{dialog.name}</h3>
                    <p className={style.message}>Last messge...</p>
                </div>
            </div>
        </NavLink>
    )
}

export default DialogItem