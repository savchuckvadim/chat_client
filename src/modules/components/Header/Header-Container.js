import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import Header from "./Header";


const mapState = (state) => {

    return {
        isAuth: state.auth.isAuth
    }
}



const HeaderContainer = connect(mapState, {
    logout: logout
})(Header)
export default HeaderContainer