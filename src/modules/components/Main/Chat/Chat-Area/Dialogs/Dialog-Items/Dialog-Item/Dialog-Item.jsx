import { NavLink } from 'react-router-dom'
import style from './Dialog-Item.module.css'

const DialogItem = ({ dialog, changeCurrentDialog }) => {
    let title = <h3 className={style.name}>{dialog.dialogsUsers[0] && dialog.dialogsUsers[0].name}</h3>
    if(dialog.isGroup){
        title = <h3 className={style.name}>{dialog.dialogName}</h3>
    }
    return (
        <NavLink to={`${dialog.dialogId}`}
            onClick={() => { 
                
                changeCurrentDialog(dialog) 
            }}
        >

            <div className={style.item}>
                <div className={style.avatar}>
                    <p className={style.initials}>CT</p>
                </div>
                <div className={style.text__wrapper}>
                    {title}
                    <p className={style.message}>{dialog.dialogsMessages.length > 0 && dialog.dialogsMessages[0].body.length > 0 &&
                        `${dialog.dialogsMessages[0].body.slice(0,2)}...`}</p>
                </div>
            </div>
        </NavLink>
    )
}

export default DialogItem