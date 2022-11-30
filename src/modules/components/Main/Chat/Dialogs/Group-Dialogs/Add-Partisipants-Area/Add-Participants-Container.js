import { connect } from "react-redux"
import { setParticipant, setGroupDialogsName } from "../../../../../../redux/dialogs-reducer"
import AddPartisipantsArea from "./Add-Partisipants-Area"

const mapStateToProps = (state) => {
    return {
        // newGroupDialogsName: state.dialogs.newGroupDialogsName,
        name: state.dialogs.newGroupDialog.name,
        participants: state.dialogs.newGroupDialog.participants,
        addingParticipantsInProgress: state.group.addingParticipantsInProgress,
        inProgress: state.preloader.inProgress
    }
}

const AddParticipantsContainer = connect(mapStateToProps, {
    setGroupDialogsName,
    setParticipant,
})(AddPartisipantsArea)

export default AddParticipantsContainer