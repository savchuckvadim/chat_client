import { connect } from "react-redux"
import Messages from "./Messages"


const mapStateToProps = (state) => {
    let messages = []
    if(state.dialogs.dialogs.length > 0){
        let currentDialog = state.dialogs.dialogs.filter(dialog => dialog.dialogId === state.dialogs.currentDialogId)[0]
        
       console.log('currentDialog')
       console.log(currentDialog)
       
       if (currentDialog) {
            messages = currentDialog.dialogsMessages
            console.log('MESSAGES')
            console.log(messages)
            
        }
    }
    
    
    return {
        messages
    }
}

export default connect(mapStateToProps, {

})(Messages)