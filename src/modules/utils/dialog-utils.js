

export const searchDialog = (dialogId, groupsOfDialogs) => {
    //groupsOfDialogs = [[dialogs][groupDialogs]]
    let searchingDialog = null
    groupsOfDialogs.forEach(group => {
        group.forEach(dialog => {
            if (dialog.dialogId === dialogId) {
                searchingDialog = dialog
            }
        })
    })
    if (searchingDialog) {
        const resultCurrentDialog = { ...searchingDialog }
        resultCurrentDialog.dialogsMessages = searchingDialog.dialogsMessages.map(message => ({ ...message }))
        return resultCurrentDialog
    } else {
        return searchingDialog
    }


}