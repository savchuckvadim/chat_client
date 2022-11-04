import { connect } from "react-redux"
import { addNewGroupDialog } from "../../../../../../../../redux/dialogs-reducer"
import PartisipantsButtons from "./Partisipants-Buttons"


const mapStateToProps = (state) => {
    return {
        name: state.dialogs.newGroupDialog.name,
        participants: state.dialogs.newGroupDialog.participants,
    }
}

const PartisipantsButtonsContainer = connect(mapStateToProps, {
    addNewGroupDialog
})(PartisipantsButtons)

export default PartisipantsButtonsContainer