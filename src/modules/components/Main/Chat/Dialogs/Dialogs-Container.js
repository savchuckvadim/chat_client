import { connect } from "react-redux"
import { contextMenuToggler } from "../../../../redux/context-menu-reducer"
import { changeCurrentDialog, deleteDialog, setEditingGroupDialog } from "../../../../redux/dialogs-reducer"
import { addParticipantsInProgress } from "../../../../redux/group-reducer"

import Dialogs from "./Dialogs"

const maStateToProps = (state) => {

    return {
        authUser: state.auth.authUser,
        dialogs: state.dialogs.dialogs,
        groupDialogs: state.dialogs.groupDialogs,
        isContextMenuActive: state.contextMenu.isActive,
        currentMenu: state.contextMenu.currentMenu,
        currentEntityId: state.contextMenu.currentEntityId,
        currentTypeOfArea: state.contextMenu.typeOfArea,
        online: state.users.online

    }
}

const DialogsContainer = connect(maStateToProps, {

    changeCurrentDialog,
    addParticipantsInProgress,
    contextMenuToggler,
    deleteDialog,
    setEditingGroupDialog,
    addParticipantsInProgress

})(Dialogs)

export default DialogsContainer