import { connect } from "react-redux"
import { participantsNewGroupDialog, setGroupDialogsName } from "../../../../../../../redux/dialogs-reducer"
import AddPartisipantsArea from "./Add-Partisipants-Area"

const mapStateToProps = (state) => {
    return {
        newGroupDialogsName: state.dialogs.newGroupDialogsName,
        name: state.dialogs.newGroupDialog.name,
        participants: state.dialogs.newGroupDialog.participants,
        addingParticipantsInProgress: state.group.addingParticipantsInProgress,
    }
}

const AddPartisipantsContainer = connect(mapStateToProps, {
    setGroupDialogsName,
    participantsNewGroupDialog,
})(AddPartisipantsArea)

export default AddPartisipantsContainer