import React, { useEffect } from "react"
import { connect } from "react-redux"
import App from "./App"
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
    }, [props.authUser])


    return (
        <App {...props} />
    )


}

export default connect(mapStateToProps, {
    me,
    contextMenuToggler
})(AppContainer)