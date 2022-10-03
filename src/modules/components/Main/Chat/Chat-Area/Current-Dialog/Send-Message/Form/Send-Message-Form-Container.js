import { connect } from "react-redux"
import SendMessageForm from "./Send-Message-Form"



const mapStateToProps = (state) => {
    return {
        currentMessage: state.dialogs.currentMessage
    }
}


const SendMessageFormContainer = connect(mapStateToProps, {

})(SendMessageForm)

export default SendMessageFormContainer