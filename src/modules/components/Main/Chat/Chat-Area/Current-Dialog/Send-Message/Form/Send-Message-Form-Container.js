import { connect } from "react-redux"
import { sendMessage } from "../../../../../../../redux/dialogs-reducer"
import SendMessageForm from "./Send-Message-Form"



const mapStateToProps = (state) => {
    return {
        // currentMessageBody: state.dialogs.currentMessage.body,
        currentDialogId: state.dialogs.currentDialogId,
        isSending: state.dialogs.currentMessage.isSending
    }
}


const SendMessageFormContainer = connect(mapStateToProps, {
    sendMessage
})(SendMessageForm)

export default SendMessageFormContainer