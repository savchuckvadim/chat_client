import { connect } from "react-redux"
import { changeCurrentDialog } from "../../../../../redux/dialogs-reducer"
import { addPartisipantsInProgress } from "../../../../../redux/group-reducer"
import Dialogs from "./Dialogs"

const maStateToProps = (state) => {

    return {
        authUser: state.auth.authUser,
        dialogs: state.dialogs.dialogs,
        groupDialogs: state.dialogs.groupDialogs,
       
    }
}

const DialogsContainer = connect(maStateToProps, {
    
    changeCurrentDialog,
    addPartisipantsInProgress
})(Dialogs)

export default DialogsContainer