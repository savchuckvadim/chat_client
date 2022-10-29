

export const searchDialog = (dialogId, groupsOfDialogs) => {
    //dialogs = [[dialogs][groupDialogs]]
    let searchingDialog = null
    groupsOfDialogs.forEach(group => {
        group.forEach(dialog => {
            if (dialog.dialogId === dialogId) {
                searchingDialog = dialog
            }
        })
    })
    debugger
    return searchingDialog

}