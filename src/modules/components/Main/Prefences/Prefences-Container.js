import { connect } from "react-redux"
import { changeProfileName } from "../../../redux/auth-reducer"
import MenuSection from "../../common/Menu-Section/Menu-Section"



const mapState = (state) => {

    return {
        authUser: state.auth.authUser,
        sectionName: 'Prefences',
        name: 'Sound notification',
        value: state.auth.authUser && `state.auth.authUser.isSound`,
        actionName: 'Off',
    }
}


export default connect(mapState, {
    action: changeProfileName
})(MenuSection)