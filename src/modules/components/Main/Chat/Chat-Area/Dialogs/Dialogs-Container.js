import { connect } from "react-redux"
import { getDialogs } from "../../../../../redux/dialogs-reducer"
import Dialogs from "./Dialogs"

const maStateToProps = (state) => {

    return {
        dialogs : state.dialogs.dialogs
    }
}

const DialogsContainer = connect(maStateToProps,{
    getDialogs
})(Dialogs)

export default DialogsContainer