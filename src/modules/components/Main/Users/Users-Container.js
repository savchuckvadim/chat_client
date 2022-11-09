import { connect } from "react-redux";
import { setParticipant } from "../../../redux/dialogs-reducer";
import { addDeleteContact, findUser, getUsers } from "../../../redux/users-reducer";
import Users from "./Users";

const mapStateToProps = (state) => {

    return {
        users: state.users.users,
        inProgress: state.users.inProgress,
        addingParticipantsInProgress: state.group.addingParticipantsInProgress,
        participants: state.dialogs.newGroupDialog.participants,
        isMessageForwarding: state.dialogs.isMessageForwarding,
        dialogs:  state.dialogs.dialogs
    }
}


const UsersContainer = connect(mapStateToProps, {
    getUsers,
    addDeleteContact,
    setParticipant,
    findUser
})(Users)

export default UsersContainer