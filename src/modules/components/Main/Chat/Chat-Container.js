import { useEffect } from "react"
import { connect } from "react-redux"
import { Navigate, useParams } from "react-router-dom"
import { getDialogs } from "../../../redux/dialogs-reducer"
import Chat from "./Chat"




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
            props.getDialogs(dialogIdFromUrl)
        }



    }, [])
    if (dialogIdFromUrl === undefined) { // в url нет параметра dialogId

        if (props.currentDialogId !== undefined) {

            return <Navigate replace to={`../chat/${props.currentDialogId}`} />
        }
    }else{
        if (props.currentDialogId && dialogIdFromUrl !== props.currentDialogId) {

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