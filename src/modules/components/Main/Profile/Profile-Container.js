import { connect } from "react-redux"
import { changeProfileName } from "../../../redux/auth-reducer"
import MenuSection from "../../common/Menu-Section/Menu-Section"



const mapState = (state) => {

    return {
        authUser: state.auth.authUser,
        sectionName: 'Profile',
        name: 'User Name',
        value: state.auth.authUser && state.auth.authUser.name,
        actionName: 'Change',
    }
}


export default connect(mapState, {
    action: changeProfileName
})(MenuSection)