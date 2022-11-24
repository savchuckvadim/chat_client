import Moment from 'react-moment'
import { onRightClick } from '../../../../../../utils/context-menu-utils'
import Avatar from '../../../../../common/Avatar/Avatar'
import ContextMenu from '../../../../../common/Context-Menu/Context-Menu'
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
    isNotification = undefined

}) => {
    let body = message.body
    let messageClass = style.myMessage
    let infoWrapperClass = style.myInfo__wrapper
    let infoItemClass = style.myInfoItem
    let dateClass = style.my__date
    if (!message.isAuthorIsAuth) {
        messageClass = style.message
        infoWrapperClass = style.info__wrapper
        infoItemClass = style.infoItem
        dateClass = style.date

    }
    if (isNotification) {
        messageClass = style.notification
        infoWrapperClass = style.info__wrapper
        infoItemClass = style.infoItem
        body = message.body.length > 30
            ? `${message.body.slice(0, 30)}...`
            : `${message.body}`
        dateClass = style.nodate

    }
    let authorName = message.author.name.length > 15
        ? `${message.author.name.slice(0, 15)}...`
        : message.author.name

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
                <div className={style.left__area}>
                    <p className={style.author}>{authorName}</p>
                </div>

                <p className={dateClass}><Moment fromNow >{message.created}</Moment> </p>
            </div>
            <div className={style.body}>
                <p className={style.body__text}>{
                    body
                }</p>
            </div>
            {!isNotification
                ? <div className={style.messageFooter}>
                    <div className={infoWrapperClass} >
                        {message.isForwarded ? <p className={infoItemClass}>{'=>'}</p> : null}
                        {message.isEdited ? <p className={infoItemClass}>{'~#'}</p> : null}
                    </div>
                </div>
                : null
            }

        </div >
    )

}

export default MessageItem