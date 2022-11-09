import { connect } from "react-redux"
import { changeForwardingMessageStatus } from "../../../../../../../redux/dialogs-reducer"
import ForwardMessage from "./Forward-Message"


const mapStateToProps = (state) => {
    return {
        isMessageForwarding: state.dialogs.forwardingMessage.inProgress
    }
}

const ForwardMessageContainer = connect(
    mapStateToProps,
    {
        changeForwardingMessageStatus
    }
)(ForwardMessage)

export default ForwardMessageContainer