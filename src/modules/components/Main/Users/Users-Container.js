import { connect } from "react-redux";
import { addContact, getUsers } from "../../../redux/users-reducer";
import Users from "./Users";

const mapStateToProps = (state) => {

    return {
        users: state.users.users,
        inProgress: state.users.inProgress
    }
}


export default connect(mapStateToProps, {
    getUsers,
    addContact
})(Users)