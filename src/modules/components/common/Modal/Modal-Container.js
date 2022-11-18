import { connect } from "react-redux"
import { logout } from "../../../redux/auth-reducer";
import { changeModalStatus } from "../../../redux/modal-reducer"
import { changeForwardingMessageStatus } from "../../../redux/dialogs-reducer"
import Modal from "./Modal"


const mapStateToProps = (state) => {
    return {
        isModalActive: state.modal.isActive,
        isMessageForwarding: state.dialogs.forwardingMessage.inProgress,
        // isSending: state.dialogs.currentMessage.isSending,
    }
}

const ModalContainer = connect(
    mapStateToProps,
    {
        changeModalStatus,
        changeForwardingMessageStatus,
        logout
    }
)(Modal)

export default ModalContainer