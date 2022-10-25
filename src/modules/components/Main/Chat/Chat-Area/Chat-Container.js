import { connect } from "react-redux"
import { setNewMessage } from "../../../../redux/dialogs-reducer"
import Chat from "./Chat"


const mapStatetToProps = (state) => {

    return {
        authUserId: state.auth.authUser.id
    }
}

export default connect(mapStatetToProps, {
    setNewMessage
})(Chat)