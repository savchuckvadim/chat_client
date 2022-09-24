import { connect } from "react-redux";
import { getUsers } from "../../../redux/users-reducer";
import Users from "./Users";

const mapStateToProps = (state) => {

    return {
        users: state.users.users
    }
}


export default connect(mapStateToProps, {
    getUsers
})(Users)