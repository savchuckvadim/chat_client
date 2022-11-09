import { onRightClick } from '../../../../../../../utils/context-menu-utils'
import ContextMenu from '../../../../../../common/Context-Menu/Context-Menu'
import style from './Message-Item.module.css'

const MessageItem = ({
    message,
    isContextMenuActive,
    currentTypeOfArea,
    currentEntityId,
    currentMenu,
    contextMenuToggler,
    changeForwardingMessageStatus
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
                entityId={message.id}
                currentEntityId={currentEntityId}
                entityTypeOfArea={'message'}
                currentTypeOfArea={currentTypeOfArea}
                isActive={isContextMenuActive}
                currentMenu={currentMenu}
                changeForwardingMessageStatus={changeForwardingMessageStatus}
            />
            <div className={style.body}>{message.body}</div>
        </div >
    )

}

export default MessageItem