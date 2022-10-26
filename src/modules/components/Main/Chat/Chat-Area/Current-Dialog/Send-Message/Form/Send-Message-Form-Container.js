import { connect } from "react-redux"
import { sendMessage } from "../../../../../../../redux/dialogs-reducer"
import SendMessageForm from "./Send-Message-Form"



const mapStateToProps = (state) => {
    return {
        currentMessage: state.dialogs.currentMessage,
        currentDialogId: state.dialogs.currentDialogId
    }
}


const SendMessageFormContainer = connect(mapStateToProps, {
    sendMessage
})(SendMessageForm)

export default SendMessageFormContainer