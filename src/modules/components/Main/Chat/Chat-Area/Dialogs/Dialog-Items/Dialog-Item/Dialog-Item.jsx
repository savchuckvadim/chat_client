import { NavLink } from 'react-router-dom'
import ContextMenu from '../../../../../../common/Context-Menu/Context-Menu'
import style from './Dialog-Item.module.css'

const DialogItem = ({ dialog, changeCurrentDialog, isContextMenuActive, xPos, yPos, currentMenu, currentEntityId,  contextMenuToggler }) => {
    const onRightClick = (e) => {
        if (e) {
            e.preventDefault()

            const xPos = e.pageX + "px";
            const yPos = e.pageY + "px";
            contextMenuToggler(true, 'dialog', xPos, yPos, dialog.id)

        }
    }

    let contextMenu = null
    if (dialog.dialogsUsers[0]) {
        let name = dialog.dialogsUsers[0].name

        if (dialog.isGroup) {
            name = dialog.dialogName
            contextMenu = <ContextMenu
                entityId={dialog.id}
                typeOfArea={'dialog'}
                isActive={isContextMenuActive}
                xPos={xPos}
                yPos={yPos}
                currentMenu={currentMenu}
                currentEntityId={currentEntityId}
                contextMenuToggler={contextMenuToggler}
            />

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
    } else {
        return null
    }

}

export default DialogItem