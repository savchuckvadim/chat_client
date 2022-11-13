
import { connect } from "react-redux";
import { registration } from "../../../redux/auth-reducer";
import Registration from "./Registration";



const mapDispatchToProps = (state) => {
    return {
        
    }
}
const RegistrationContainer = connect(mapDispatchToProps, {
    registration,
    // setRegistrationUrl
}
)(Registration)

export default RegistrationContainer