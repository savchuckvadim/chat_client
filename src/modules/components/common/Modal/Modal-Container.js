import { connect } from "react-redux"
import { changeForwardingMessageStatus } from "../../../redux/dialogs-reducer"
import Modal from "./Modal"


const mapStateToProps = (state) => {
    return {
        isMessageForwarding: state.dialogs.forwardingMessage.inProgress,
        isSending: state.dialogs.currentMessage.isSending,
    }
}

const ModalContainer = connect(
    mapStateToProps,
    {
        changeForwardingMessageStatus
    }
)(Modal)

export default ModalContainer