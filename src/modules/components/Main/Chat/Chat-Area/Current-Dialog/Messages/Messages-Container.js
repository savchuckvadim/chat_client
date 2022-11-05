import { connect } from "react-redux"
import Messages from "./Messages"


const mapStateToProps = (state) => {
    let messages = []
    let dialogs =[]
    if(state.dialogs.dialogs.some(dialog => dialog.dialogId === state.dialogs.currentDialogId)){
        dialogs = state.dialogs.dialogs
    }else if(state.dialogs.groupDialogs.some(dialog => dialog.dialogId === state.dialogs.currentDialogId)){
        dialogs = state.dialogs.groupDialogs
    }

    if(dialogs.length > 0){
        let currentDialog = dialogs.filter(dialog => dialog.dialogId === state.dialogs.currentDialogId)[0]
       
       if (currentDialog) {
            messages = currentDialog.dialogsMessages
        }
    }
    
    
    return {
        messages,
        //  isSending:  false/sending/sended/
        isSending: state.dialogs.currentMessage.isSending
    }
}

export default connect(mapStateToProps, {

})(Messages)