import ContextMenu from '../../../../../../common/Context-Menu/Context-Menu'
import style from './Message-Item.module.css'

const MessageItem = ({ message, isContextMenuActive, xPos, yPos, currentMenu, contextMenuToggler }) => {

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
                        contextMenuToggler(true, 'message', xPos, yPos)
                    }
                }}
            >
                <ContextMenu
                    typeOfArea={'message'}
                    isActive={isContextMenuActive}
                    xPos={xPos}
                    yPos={yPos}
                    currentMenu={currentMenu}
                    contextMenuToggler={contextMenuToggler}
                />
                {message.body}
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