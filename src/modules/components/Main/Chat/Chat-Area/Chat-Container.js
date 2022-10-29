import { connect } from "react-redux"
import { setNewMessage } from "../../../../redux/dialogs-reducer"
import Chat from "./Chat"


const mapStatetToProps = (state) => {
    
    return {
        authUserId: state.auth.authUser.id,
        currentDialog: state.dialogs.dialogs.currentDialog
    }
}

export default connect(mapStatetToProps, {
    setNewMessage
})(Chat)