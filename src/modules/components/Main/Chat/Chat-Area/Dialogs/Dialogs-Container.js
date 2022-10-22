import { connect } from "react-redux"
import { getDialogs } from "../../../../../redux/dialogs-reducer"
import Dialogs from "./Dialogs"

const maStateToProps = (state) => {

    return {
        authUser: state.auth.authUser,
        dialogs: state.dialogs.dialogs
    }
}

const DialogsContainer = connect(maStateToProps, {
    getDialogs
})(Dialogs)

export default DialogsContainer