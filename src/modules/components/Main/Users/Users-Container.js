import { connect } from "react-redux";
import { participantsNewGroupDialog } from "../../../redux/dialogs-reducer";
import { addContact, deleteContact, getUsers } from "../../../redux/users-reducer";
import Users from "./Users";

const mapStateToProps = (state) => {

    return {
        users: state.users.users,
        inProgress: state.users.inProgress,
        addingParticipantsInProgress: state.group.addingParticipantsInProgress,
        participants:state.dialogs.newGroupDialog.participants,
    }
}


export default connect(mapStateToProps, {
    getUsers,
    addContact,
    deleteContact,
    participantsNewGroupDialog
})(Users)