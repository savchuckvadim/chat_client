import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Navigate, useParams } from "react-router-dom"
import { getDialogs, setNewMessage } from "../../../../redux/dialogs-reducer"
import Chat from "./Chat"
import { echo } from '../../../../services/websocket/socket'
import Preloader from "../../../common/Preloader/Preloader"



const withRouter = (WrappedComponent) => (props) => {
    const params = useParams()

    return (
        <WrappedComponent
            {...props}
            params={params} />
    )
}

const mapStatetToProps = (state) => {

    return {
        authUserId: state.auth.authUser.id,
        currentDialog: state.dialogs.currentDialog,
        currentDialogId: state.dialogs.currentDialogId

    }
}
const ChatContainer = (props) => {

    const getDialogId = () => {
        if (props.params) {
            if (props.params.dialogId !== undefined) {
                return Number(props.params.dialogId)
            }
        }
        return undefined
    }

    let dialogIdFromUrl = getDialogId()

    useEffect(() => {

        if (props.authUserId
            // && !props.currentDialogId
        ) {
            props.getDialogs(props.authUserId, dialogIdFromUrl)
        }



    }, [])
    if (dialogIdFromUrl === undefined) { // в url нет параметра dialogId

        if (props.currentDialogId !== undefined && dialogIdFromUrl !== props.currentDialogId) {

            return <Navigate replace to={`../chat/${props.currentDialogId}`} />
        }
    }

    return (
        <Chat {...props} />
    )
}

export default connect(mapStatetToProps, {
    getDialogs

})(withRouter(ChatContainer))