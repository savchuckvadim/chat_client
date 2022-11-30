import { useEffect, useRef } from 'react'
import MessageItem from '../Main/Chat/Current-Dialog/Messages/Message-Item/Message-Item'
import style from './Notifications.module.css'

const Notification = ({
    index,
    notification,
    deleteNotification,
}) => {

    const message = notification.message

    useEffect(() => {

        setTimeout(() => { 
            debugger
            deleteNotification(message.id) }, 20000)

    }, [])


    return (

        <div style={{ opacity: 1.5 / (index + 1) }} className={style.notification}>

            <MessageItem
                key={`notifi-message-${message.id}`}
                message={message}
                isContextMenuActive={false}
                currentTypeOfArea={'notifications'}
                currentMenu={[]}
                currentEntityId={null}
                contextMenuToggler={null}
                changeForwardingMessageStatus={null}
                setEditingStatus={null}
                deleteMessage={null}
                isNotification={true}
            />
        </div>
    )
}


const Notifications = (props) => {


    return props.notificationStatus && props.notifications.length > 0 ? (

        <div className={style.container}>
           
            <div className={style.header}>
                <div className={style.functions}>
                    <div onClick={props.resetNotifications} className={style.reset}>
                        <p>скрыть</p>
                    </div>

                </div>
            </div>
            <div className={style.notifications}>
                {props.notifications.map((n, i) =>
                    <Notification
                        key={`notification-${n.id}- ${i}`}
                        index={i}
                        notification={n} 
                        deleteNotification={props.deleteNotification}
                        />)}
            </div>

        </div>

    )
        : null
}

export default Notifications