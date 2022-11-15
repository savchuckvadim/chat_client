import { connect } from "react-redux"
import { sendEditMessage, sendMessage } from "../../../../../../../redux/dialogs-reducer"
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
        editingBody: state.dialogs.editingMessage.body,
        editingMessageId: state.dialogs.editingMessage.id,

    }
}


const SendMessageFormContainer = connect(mapStateToProps, {
    sendMessage,
    sendEditMessage
})(SendMessageForm)

export default SendMessageFormContainer