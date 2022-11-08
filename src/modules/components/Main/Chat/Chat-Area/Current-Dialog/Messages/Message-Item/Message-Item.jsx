import ContextMenu from '../../../../../../common/Context-Menu/Context-Menu'
import style from './Message-Item.module.css'

const MessageItem = ({ message, isContextMenuActive, xPos, yPos, currentMenu, currentEntityId, contextMenuToggler }) => {

    const onRightClick = (e) => {
        if (e) {
            e.preventDefault()

            const xPos = e.pageX + "px";
            const yPos = e.pageY + "px";
            contextMenuToggler(true, 'message', xPos, yPos, message.id)

        }
    }
    let messageClass = style.myMessage
    if (!message.isAuthorIsAuth) {
        messageClass = style.message
    }

    return (
        <div className={messageClass}
            onContextMenu={(e) => { onRightClick(e) }}
        >
            <ContextMenu
                entityId={message.id}
                typeOfArea={'message'}
                isActive={isContextMenuActive}
                xPos={xPos}
                yPos={yPos}
                currentMenu={currentMenu}
                currentEntityId={currentEntityId}
                contextMenuToggler={contextMenuToggler}
            />
            <div className={style.body}>{message.body}</div>
        </div >
    )

}

export default MessageItem