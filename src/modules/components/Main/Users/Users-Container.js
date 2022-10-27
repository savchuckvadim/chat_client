import { connect } from "react-redux";
import { setUserForNewGroupDialog } from "../../../redux/dialogs-reducer";
import { addContact, deleteContact, getUsers } from "../../../redux/users-reducer";
import Users from "./Users";

const mapStateToProps = (state) => {

    return {
        users: state.users.users,
        inProgress: state.users.inProgress,
        addingPartisipantsInProgress: state.group.addingPartisipantsInProgress
    }
}


export default connect(mapStateToProps, {
    getUsers,
    addContact,
    deleteContact,
    setUserForNewGroupDialog
})(Users)