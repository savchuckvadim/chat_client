import { connect } from "react-redux"
import { changeProfileName } from "../../../redux/auth-reducer"
import MenuSection from "../../common/Menu-Section/Menu-Section"



const mapState = (state) => {

    return {
        authUser: state.auth.authUser,
        sectionName: 'Prefences',
        name: 'Sound',
        value: state.auth.authUser && 'On', //state.auth.authUser.isSound
        actionName: 'Change',
    }
}


export default connect(mapState, {
    action: changeProfileName
})(MenuSection)