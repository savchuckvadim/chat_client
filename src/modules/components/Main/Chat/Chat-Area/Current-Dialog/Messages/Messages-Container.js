import { connect } from "react-redux"
import Messages from "./Messages"


const mapStateToProps = (state) => {

    return {
        messages: state.dialogs.messages
    }
}

export default connect(mapStateToProps,{

})(Messages)