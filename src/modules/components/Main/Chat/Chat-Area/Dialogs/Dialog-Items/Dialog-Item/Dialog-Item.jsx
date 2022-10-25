import { NavLink } from 'react-router-dom'
import style from './Dialog-Item.module.css'

const DialogItem = ({ dialog, changeCurrentDialog }) => {

    return (
        <NavLink to={`${dialog.dialogId}`}
            onClick={() => { changeCurrentDialog(dialog.dialogId) }}
        >

            <div className={style.item}>
                <div className={style.avatar}>
                    <p className={style.initials}>CT</p>
                </div>
                <div className={style.text__wrapper}>
                    <h3 className={style.name}>{dialog.dialogsUser.name}</h3>
                    <p className={style.message}>{dialog.dialogsMessages.length &&
                        `${dialog.dialogsMessages[0].body.slice(0,3)}...`}</p>
                </div>
            </div>
        </NavLink>
    )
}

export default DialogItem