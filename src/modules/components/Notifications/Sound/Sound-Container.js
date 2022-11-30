import { connect } from "react-redux"
import { deleteNewNotification } from "../../../redux/notifications-reducer"
import Sound from "./Sound"



const mapState = (state) => {
  
    return {
        newNotification: state.notifications.newNotification
    }
}

export default connect(mapState, {
    deleteNewNotification
})(Sound)