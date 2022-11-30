import { connect } from "react-redux"
import { changeNotificationStatus, deleteNotification, deleteNewNotification, resetNotifications } from "../../redux/notifications-reducer"
import Notifications from "./Notifications"


const mapState = (state) => {
  
    return {
        
        notificationStatus: state.notifications.isActive,
        notifications: state.notifications.notifications,
       

    }
}

export default connect(mapState, {
    changeNotificationStatus,
    resetNotifications,
    deleteNotification,
   
})(Notifications)