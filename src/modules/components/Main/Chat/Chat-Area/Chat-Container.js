import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { getDialogs, setNewMessage } from "../../../../redux/dialogs-reducer"
import Chat from "./Chat"
import { echo } from '../../../../services/websocket/socket'



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
    const [currentDialog, setCurrentDialog] = useState(props.currentDialog)
    const [dialogId, setDialogId] = useState(dialogIdFromUrl)
    const [authUserId, setAuthUserId] = useState(props.authUserId)
    const [isGroup, setIsGroup] = useState(props.currentDialog && props.currentDialog.isGroup)

    useEffect(() => {
        
        props.getDialogs(dialogIdFromUrl)
        setDialogId(dialogIdFromUrl)

    }, [])


   
    return (
        <Chat {...props} dialogId={dialogId} />
    )
}

export default connect(mapStatetToProps, {
    getDialogs,
    setNewMessage
})(withRouter(ChatContainer))