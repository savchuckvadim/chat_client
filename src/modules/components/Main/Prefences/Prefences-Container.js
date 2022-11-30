import { connect } from "react-redux"
import { changeSoundUser } from "../../../redux/auth-reducer"
import MenuSection from "../../common/Menu-Section/Menu-Section"



const mapState = (state) => {
    let value = 'Off'
    if(state.auth.authUser){
        if(state.auth.authUser.isSound){
            value = 'On'
        }
    }

    return {
        authUser: state.auth.authUser,
        sectionName: 'Prefences',
        name: 'Sound',
        value, //state.auth.authUser.isSound
        actionName: 'Change',
    }
}


export default connect(mapState, {
    action: changeSoundUser
})(MenuSection)