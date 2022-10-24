import { connect } from "react-redux"
import Messages from "./Messages"


const mapStateToProps = (state) => {
    let currentDialog = state.dialogs.dialogs.filter(dialog => dialog.dialogId === state.dialogs.currentDialogId)[0]
    
    let messages = []
    if (currentDialog) {
        messages = currentDialog.messages
    }
    
    return {
        messages
    }
}

export default connect(mapStateToProps, {

})(Messages)