import React, { useEffect } from "react"
import { connect } from "react-redux"
import App from "./App"
import Preloader from "./modules/components/common/Preloader/Preloader"
import Start from "./modules/components/Start/Start"
import { me } from "./modules/redux/auth-reducer"



const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        inProgress: state.preloader.inProgress,
        addingPartisipantsInProgress: state.group.addingPartisipantsInProgress

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
    me
})(AppContainer)