import { NavLink } from 'react-router-dom'
import { onRightClick } from '../../../../../../utils/context-menu-utils'
import Avatar from '../../../../../common/Avatar/Avatar'
import ContextMenu from '../../../../../common/Context-Menu/Context-Menu'
import style from './Dialog-Item.module.css'



const DialogItem = ({
    dialog,
    isContextMenuActive,
    currentTypeOfArea,
    currentMenu,
    currentEntityId,
    contextMenuToggler,
    changeCurrentDialog,
    deleteDialog,
    setEditingGroupDialog,
    addParticipantsInProgress
}) => {


    let contextMenu = null
    let entityTypeOfArea = 'dialog'
    let isOnline = null
    if (dialog.dialogsUsers[0]) {
        let name = dialog.dialogsUsers[0].name
        isOnline = dialog.dialogsUsers[0].isActive
        if (dialog.isGroup) {
            entityTypeOfArea = 'group-dialog'
            name = dialog.dialogName
            isOnline = null
        }

        contextMenu = <ContextMenu
            message={null}
            dialog={dialog}
            entityId={dialog.dialogId}
            currentEntityId={currentEntityId} //state.contextMenu.currentEntityId,
            entityTypeOfArea={entityTypeOfArea}
            currentTypeOfArea={currentTypeOfArea} //state.contextMenu.typeOfArea
            isActive={isContextMenuActive} //state.contextMenu.isActive,
            currentMenu={currentMenu} //state.contextMenu.currentMenu
            changeForwardingMessageStatus={null}        // = null
            setEditingStatus={null}        // = null
            deleteMessage={null}        // = null
            deleteDialog={deleteDialog}
            setEditingGroupDialog={setEditingGroupDialog}
            addParticipantsInProgress={addParticipantsInProgress}

        />



        let title = <h3 className={style.name}>{name}</h3>


        return (


            <div >
                <NavLink to={`${dialog.dialogId}`}
                    onClick={() => {

                        changeCurrentDialog(dialog)
                    }}
                    onContextMenu={(e) => { onRightClick(e, true, entityTypeOfArea, dialog.dialogId, contextMenuToggler) }}
                    className={style.item}
                >
                   <div className={style.avatar__wrapper}>
                   <Avatar name={name} isOnline={isOnline} />
                   </div>
                       
                   

                    <div className={style.text__wrapper}>
                        {title}
                        <p className={style.message}>{dialog.dialogsMessages.length > 0 && dialog.dialogsMessages[0].body.length > 0 &&
                            `${dialog.dialogsMessages[dialog.dialogsMessages.length - 1].body.slice(0, 2)}...`}</p>
                    </div>

                </NavLink>
                {contextMenu}

            </div >

        )
    } else {
        return null
    }

}

export default DialogItem