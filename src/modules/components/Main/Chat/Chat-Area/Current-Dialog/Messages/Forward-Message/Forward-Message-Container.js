import { connect } from "react-redux"
import { changeForwardingMessageStatus } from "../../../../../../../redux/dialogs-reducer"
import ForwardMessage from "./Forward-Message"


const mapStateToProps = (state) => {
    return {
        isForwardedMessage: state.dialogs.isForwardedMessage
    }
}

const ForwardMessageContainer = connect(
    mapStateToProps,
    {
        changeForwardingMessageStatus
    }
)(ForwardMessage)

export default ForwardMessageContainer