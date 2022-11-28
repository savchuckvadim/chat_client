import { useEffect, useRef, useState } from 'react'
// import { NotificationManager } from 'react-notifications'
import MessageItem from '../Main/Chat/Current-Dialog/Messages/Message-Item/Message-Item'
// import NotificationsContainer from './Notifications-Container'
import style from './Notifications.module.css'
import NotificationSound from "../../../assets/notification.mp3";

const Notification = ({
    index,
    notification,
    sound,
    audioPlayer,
    deleteNotification,
}) => {

    console.log(notification)
    useEffect(() => {
        audioPlayer.current.play();

        setTimeout(() => { deleteNotification(notification.id) }, 20000)
    }, [])


    return (

        <div style={{ opacity: 1.5 / (index + 0.7) }} className={style.notification}>

            <MessageItem
                key={`notifi-message-${notification.id}`}
                message={notification}
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
    const audioPlayer = useRef(null);
    return props.notificationStatus && props.notifications.length > 0 ? (

        <div className={style.container}>
            <audio ref={audioPlayer} src={NotificationSound} style={{ display: 'none' }} />
            <div className={style.header}>
                <div className={style.functions}>
                    <div onClick={props.resetNotifications} className={style.reset}>
                        скрыть
                    </div>

                </div>
            </div>
            <div className={style.notifications}>
                {props.notifications.map((n, i) =>
                    <Notification
                        key={`notification-${n.id}- ${i}`}
                        index={i}
                        notification={n}
                        sound={props.sound}
                        audioPlayer={audioPlayer}
                        deleteNotification={props.deleteNotification} />)}
            </div>

        </div>

    )
        : null
}

export default Notifications