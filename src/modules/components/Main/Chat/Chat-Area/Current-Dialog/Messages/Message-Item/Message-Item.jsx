import ContextMenu from '../../../../../../common/Context-Menu/Context-Menu'
import style from './Message-Item.module.css'

const MessageItem = ({ message, isContextMenuActive, xPos, yPos, currentMenu, currentEntityId, contextMenuToggler }) => {

    if (message.isAuthorIsAuth) {
        return (
            <div className={style.myMessage}
                onContextMenu={(e) => {
                    e.preventDefault()
                    if (isContextMenuActive) {
                        contextMenuToggler(false)
                    } else {
                        const xPos = e.pageX + "px";
                        const yPos = e.pageY + "px";
                        contextMenuToggler(true, 'message', xPos, yPos, message.id)
                    }
                }}
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
    return (
        <div className={style.message}
            onContextMenu={(e) => {
                e.preventDefault()
                console.log(message.body)
                console.log(e.currentTarget.textContent)
            }}
        >
            {message.body}
        </div>

    )
}

export default MessageItem