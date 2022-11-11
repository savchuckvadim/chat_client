import { NavLink } from 'react-router-dom'
import { onRightClick } from '../../../../../../../utils/context-menu-utils'
import ContextMenu from '../../../../../../common/Context-Menu/Context-Menu'
import style from './Dialog-Item.module.css'

const DialogItem = ({
    dialog,
    isContextMenuActive,
    currentTypeOfArea,
    currentMenu,
    currentEntityId,
    contextMenuToggler,
    changeCurrentDialog }) => {


    let contextMenu = null
    if (dialog.dialogsUsers[0]) {
        let name = dialog.dialogsUsers[0].name

        if (dialog.isGroup) {
            name = dialog.dialogName
            contextMenu = <ContextMenu
                entityId={dialog.dialogId}
                currentEntityId={currentEntityId}
                entityTypeOfArea={'dialog'}
                currentTypeOfArea={currentTypeOfArea}
                isActive={isContextMenuActive}
                currentMenu={currentMenu}
               
            />

        }
        let initials = `${name[0]}${name[name.length - 1]}`.toUpperCase()
        let title = <h3 className={style.name}>{name}</h3>

        
        return (
            <NavLink to={`${dialog.dialogId}`}
                onClick={() => {

                    changeCurrentDialog(dialog)
                }}
                onContextMenu={(e) => { onRightClick(e, true, 'dialog', dialog.dialogId, contextMenuToggler) }}
            >

                <div className={style.item}>
                    <div className={style.avatar}>
                        <p className={style.initials}>{initials}</p>
                    </div>
                    <div className={style.text__wrapper}>
                        {title}
                        <p className={style.message}>{dialog.dialogsMessages.length > 0 && dialog.dialogsMessages[0].body.length > 0 &&
                            `${dialog.dialogsMessages[dialog.dialogsMessages.length - 1].body.slice(0, 2)}...`}</p>
                    </div>


                    {contextMenu}
                </div>
            </NavLink>
        )
    } else {
        return null
    }

}

export default DialogItem