import { connect } from "react-redux"
import { contextMenuToggler } from "../../../../../redux/context-menu-reducer"
import { changeForwardingMessageStatus, setEditingStatus, deleteMessage } from "../../../../../redux/dialogs-reducer"
import Messages from "./Messages"


const mapStateToProps = (state) => {
    let messages = []
    let dialogs = []
    if (state.dialogs.dialogs.some(dialog => dialog.dialogId === state.dialogs.currentDialogId)) {
        dialogs = state.dialogs.dialogs
    } else if (state.dialogs.groupDialogs.some(dialog => dialog.dialogId === state.dialogs.currentDialogId)) {
        dialogs = state.dialogs.groupDialogs
    }

    if (dialogs.length > 0) {
        let currentDialog = dialogs.filter(dialog => dialog.dialogId === state.dialogs.currentDialogId)[0]

        if (currentDialog) {
            messages = currentDialog.dialogsMessages
        }
    }


    return {
        messages,
        //  isSending:  false/sending/sended/
        isSending: state.dialogs.currentMessage.isSending,
        isContextMenuActive: state.contextMenu.isActive,
        currentMenu: state.contextMenu.currentMenu,
        currentEntityId: state.contextMenu.currentEntityId,
        currentTypeOfArea:  state.contextMenu.typeOfArea
    }
}

export default connect(mapStateToProps, {
    contextMenuToggler,
    changeForwardingMessageStatus,
    setEditingStatus,
    deleteMessage
})(Messages)