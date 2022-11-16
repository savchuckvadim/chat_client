import { onRightClick } from '../../../../../../../utils/context-menu-utils'
import ContextMenu from '../../../../../../common/Context-Menu/Context-Menu'
import style from './Message-Item.module.css'

const MessageItem = ({
    message,
    isContextMenuActive,
    currentTypeOfArea,
    currentEntityId, //state.contextMenu.currentEntityId,
    currentMenu,    //state.contextMenu.typeOfArea
    contextMenuToggler,
    changeForwardingMessageStatus,
    setEditingStatus,
    deleteMessage,

}) => {

    let messageClass = style.myMessage
    if (!message.isAuthorIsAuth) {
        messageClass = style.message
    }

    return (
        <div className={messageClass}
            onContextMenu={(e) => { onRightClick(e, true, 'message', message.id, contextMenuToggler) }}
        >
            <ContextMenu
                message={message}
                dialog={null}
                entityId={message.id}
                currentEntityId={currentEntityId} //state.contextMenu.currentEntityId,
                entityTypeOfArea={'message'}
                currentTypeOfArea={currentTypeOfArea} //state.contextMenu.typeOfArea
                isActive={isContextMenuActive} //state.contextMenu.isActive,
                currentMenu={currentMenu} //state.contextMenu.currentMenu
                changeForwardingMessageStatus={changeForwardingMessageStatus}
                setEditingStatus={setEditingStatus}
                deleteMessage={deleteMessage}
                deleteDialog={null}
                setEditingGroupDialog={null}
                addParticipantsInProgress={null}
            />
            <div className={style.body}>{message.body}</div>
        </div >
    )

}

export default MessageItem