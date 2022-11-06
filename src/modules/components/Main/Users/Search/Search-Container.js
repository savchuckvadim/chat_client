import { connect } from "react-redux";
import { findUser, getUsers } from "../../../../redux/users-reducer";
import Search from "./Search";


const mapStateToProps = (state) => {

    return {
        users: state.users.users,
        inProgress: state.users.inProgress,
        addingParticipantsInProgress: state.group.addingParticipantsInProgress,
        participants: state.dialogs.newGroupDialog.participants,
    }
}


const SearchContainer = connect(mapStateToProps, {
    getUsers,
    findUser
})(Search)

export default SearchContainer