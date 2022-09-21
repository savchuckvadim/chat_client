
import { connect } from "react-redux";
import { login } from "../../../redux/auth-reducer";
import Login from "./Login";

const mapDispatchToProps = (state) => {
    return {
        state
    }
}
export default connect(mapDispatchToProps, {
    login
})(Login)