import { NavLink } from 'react-router-dom'
import style from './Dialog-Item.module.css'

const DialogItem = ({ dialog, changeCurrentDialog }) => {
    if(dialog.dialogsUsers[0]){
        let name = dialog.dialogsUsers[0].name
             
        if (dialog.isGroup) {
            name = dialog.dialogName
            
        }
        let initials = `${name[0]}${name[name.length - 1]}`.toUpperCase()
        let title = <h3 className={style.name}>{name}</h3>
        
    
        return (
            <NavLink to={`${dialog.dialogId}`}
                onClick={() => {
    
                    changeCurrentDialog(dialog)
                }}
            >
    
                <div className={style.item}>
                    <div className={style.avatar}>
                        <p className={style.initials}>{initials}</p>
                    </div>
                    <div className={style.text__wrapper}>
                        {title}
                        <p className={style.message}>{dialog.dialogsMessages.length > 0 && dialog.dialogsMessages[0].body.length > 0 &&
                            `${dialog.dialogsMessages[0].body.slice(0, 2)}...`}</p>
                    </div>
                </div>
            </NavLink>
        )
    }else{
        return null
    }
    
}

export default DialogItem