import { useEffect, useRef } from 'react'
import MessageItem from '../Main/Chat/Current-Dialog/Messages/Message-Item/Message-Item'
import style from './Notifications.module.css'
import NotificationSound from "../../../assets/notification.mp3";

const Notification = ({
    index,
    notification,
    audioPlayer,
    deleteNotification,
}) => {

    const message = notification.message
    
    useEffect(() => {

        if (audioPlayer && audioPlayer.current && notification.isSound) {

            audioPlayer.current.play();
        }


        setTimeout(() => { deleteNotification(message.id) }, 20000)

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

    const audioPlayer = useRef(null);
    return props.notificationStatus && props.notifications.length > 0 ? (

        <div className={style.container}>
            <audio ref={audioPlayer} src={NotificationSound} style={{ display: 'none' }} />
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
                        audioPlayer={audioPlayer}
                        deleteNotification={props.deleteNotification} />)}
            </div>

        </div>

    )
        : null
}

export default Notifications