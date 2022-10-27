import { connect } from "react-redux"
import { addNewGroupDialog } from "../../../../../../../../redux/dialogs-reducer"
import PartisipantsButtons from "./Partisipants-Buttons"


const mapStateToProps = (state) => {
    return {
        newGroupDialogsName: state.dialogs.newGroupDialogsName,
        usersForNewGroupDialog: state.dialogs.usersForNewGroupDialog,
    }
}

const PartisipantsButtonsContainer = connect(mapStateToProps, {
    addNewGroupDialog
})(PartisipantsButtons)

export default PartisipantsButtonsContainer