import { useEffect, useState } from 'react'
import MessageItem from '../Main/Chat/Chat-Area/Current-Dialog/Messages/Message-Item/Message-Item'
import style from './Notifications.module.css'


const Notification = ({
    index,
    notification,
    deleteNotification }) => {

    const [opacity, setOpacity] = useState(0.1)
    useEffect(() => {
        setTimeout(() => { setOpacity(0.2) }, 10000)

        setTimeout(() => { deleteNotification(notification.id) }, 20000)
    }, [])
    // useEffect(() => {
    //    let newOpacity = Number(opacity) - 20
    //    setOpacity(20)
    //         setTimeout(() => { setOpacity(70) }, 1000)


    // }, [])
    return (
        <div style={{ opacity: 1 - index }} className={style.notification}>
            <MessageItem
                key={`notification-${notification.id}`}
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
    return props.notificationStatus && props.notifications.length > 0 ? (
        <div className={style.container}>
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
                        index={i}
                        notification={n}
                        deleteNotification={props.deleteNotification} />)}
            </div>

        </div>
    )
        : null
}

export default Notifications