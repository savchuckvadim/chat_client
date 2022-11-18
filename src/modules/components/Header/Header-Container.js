import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { changeModalStatus } from "../../redux/modal-reducer";
import Header from "./Header";


const mapState = (state) => {

    return {
        isAuth: state.auth.isAuth
    }
}



const HeaderContainer = connect(mapState, {
    logout,
    changeModalStatus
})(Header)
export default HeaderContainer