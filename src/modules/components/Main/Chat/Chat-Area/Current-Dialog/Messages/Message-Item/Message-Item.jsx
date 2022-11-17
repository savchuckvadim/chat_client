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
    let infoWrapperClass = style.myInfo__wrapper
    let infoItemClass = style.myInfoItem
    if (!message.isAuthorIsAuth) {
        messageClass = style.message
        infoWrapperClass = style.info__wrapper
        infoItemClass = style.infoItem

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
            <div className={style.messageHeader}>
                <p className={style.author}>{message.author ? message.author.name : null}</p>
            </div>
            <div className={style.body}>
                <p className={style.body__text}>{message.body}</p>
            </div>
            <div className={style.messageFooter}>
                <div className={infoWrapperClass} >
                    {message.isForwarded ? <p className={infoItemClass}>{'=>'}</p> : null}
                    {message.isEdited ? <p className={infoItemClass}>{'..#'}</p> : null}
                </div>
            </div>
        </div >
    )

}

export default MessageItem