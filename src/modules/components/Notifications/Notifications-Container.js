import { connect } from "react-redux"
import { changeNotificationStatus, deleteNotification, resetNotifications } from "../../redux/notifications-reducer"
import Notifications from "./Notifications"


const mapState = (state) => {
    return{
        notificationStatus: state.notifications.isActive,
        notifications: state.notifications.notifications,
        sound: state.notifications.sound,

    }
}

export default connect(mapState, {
    changeNotificationStatus,
    resetNotifications,
    deleteNotification
})(Notifications)