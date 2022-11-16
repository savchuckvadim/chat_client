import React, { useEffect } from "react"
import { connect } from "react-redux"
import App from "./App"
import Preloader from "./modules/components/common/Preloader/Preloader"
import Start from "./modules/components/Start/Start"
import { me } from "./modules/redux/auth-reducer"
import { contextMenuToggler } from "./modules/redux/context-menu-reducer"



const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        authUser: state.auth.authUser,
        registrationStatus: state.auth.registration.status,
        registrationUrl: state.auth.registration.url,
        inProgress: state.preloader.inProgress,
        addingParticipantsInProgress: state.group.addingParticipantsInProgress,
        isContextMenuActive: state.contextMenu.isActive,

    }
}

const AppContainer = (props) => {

    useEffect(() => {
        if (!props.isAuth) {
            props.me()
        }
    }, [])

    // if (!props.inProgress) {
    return (
        <App {...props} />
    )
    // } else {
    //     return (
    //         <Preloader/>
    //     )
    // }

}

export default connect(mapStateToProps, {
    me,
    contextMenuToggler
})(AppContainer)