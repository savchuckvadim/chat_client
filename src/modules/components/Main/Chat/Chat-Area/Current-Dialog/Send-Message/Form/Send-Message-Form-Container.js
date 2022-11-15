import { connect } from "react-redux"
import { sendMessage } from "../../../../../../../redux/dialogs-reducer"
import SendMessageForm from "./Send-Message-Form"



const mapStateToProps = (state) => {
    let isGroup = state.dialogs.currentDialog ? state.dialogs.currentDialog.isGroup : null
    let authUserId = state.auth.authUser ? state.auth.authUser.id : null

    return {
        // currentMessageBody: state.dialogs.currentMessage.body,
        authUserId,
        isGroup,
        currentDialogId: state.dialogs.currentDialogId,
        isSending: state.dialogs.currentMessage.isSending,
        isEditingInProgress: state.dialogs.editingMessage.inProgress,
        editedBody: state.dialogs.editingMessage.body,

    }
}


const SendMessageFormContainer = connect(mapStateToProps, {
    sendMessage
})(SendMessageForm)

export default SendMessageFormContainer