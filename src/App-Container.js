import React, { useEffect } from "react"
import { connect } from "react-redux"
import App from "./App"
import Start from "./modules/components/Start/Start"
import { me } from "./modules/redux/auth-reducer"



const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth

    }
}

const AppContainer = (props) => {

    useEffect(() => {
        if (!props.isAuth) {
            props.me()
        }
    }, [])

    if (props.isAuth) {
        return (
            <App {...props} />
        )
    } else {
        return (
            <Start />
        )
    }

}

export default connect(mapStateToProps, {
    me
})(AppContainer)