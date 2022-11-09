import { connect } from "react-redux";
import { sendMessage, setParticipant } from "../../../redux/dialogs-reducer";
import { addDeleteContact, findUser, getUsers } from "../../../redux/users-reducer";
import Users from "./Users";

const mapStateToProps = (state) => {

    return {
        authUser: state.auth.authUser,
        users: state.users.users,
        inProgress: state.users.inProgress,
        addingParticipantsInProgress: state.group.addingParticipantsInProgress,
        participants: state.dialogs.newGroupDialog.participants,
        isMessageForwarding: state.dialogs.forwardingMessage.inProgress,
        forwardingBody:state.dialogs.forwardingMessage.body,
        dialogs: state.dialogs.dialogs
    }
}


const UsersContainer = connect(mapStateToProps, {
    getUsers,
    addDeleteContact,
    setParticipant,
    sendMessage,
    findUser
})(Users)

export default UsersContainer