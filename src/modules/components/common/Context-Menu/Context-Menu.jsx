import * as React from 'react';
import style from './Context-Menu.module.css'
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

const ContextMenu = ({
    message = null,
    dialog = null,
    entityId, //this dialog
    currentEntityId,  //current Dialog From State
    entityTypeOfArea,
    currentTypeOfArea,
    isActive,
    currentMenu,
    changeForwardingMessageStatus = null,
    setEditingStatus = null,
    deleteMessage = null,
    deleteDialog = null,
    setEditingGroupDialog = null,
    addParticipantsInProgress = null


}) => {
    const dinamicStyle = {
        display: isActive &&
            entityTypeOfArea === currentTypeOfArea &&
            entityId === currentEntityId
            ? 'flex'
            : 'none',
        top: 20,
        left: 20,
    }
    let menuItems = currentMenu

    if (message && !message.isAuthorIsAuth) {
        menuItems = currentMenu.slice(0, 1)
    }


    const contextAction = (
        currentTypeOfArea, currentEntityId,
        nameOfAction
    ) => {

        if (currentTypeOfArea === 'message') {

            if (nameOfAction === 'Forward') {
                if (message && message.body) {
                    changeForwardingMessageStatus(true, message.body)
                }

            } else if (nameOfAction === 'Edit') {

                setEditingStatus(true, message)
            } else if (nameOfAction === 'Delete') {
                deleteMessage(currentEntityId)
            }
        } else if (currentTypeOfArea === 'dialog' || currentTypeOfArea === 'group-dialog') {

            if (nameOfAction === 'Edit') {

                setEditingGroupDialog(dialog)
                addParticipantsInProgress(true)

            } else if (nameOfAction === 'Delete') {

                deleteDialog(entityId)
            }
        }

    }
    return (
        // <div  className={style.container}>
        <Paper style={dinamicStyle} className={style.container}>
            <MenuList>
                {menuItems.map((item, index) => (
                    <MenuItem key={`menu-item-${index}`}
                        onClick={() => {
                            contextAction(
                                currentTypeOfArea, currentEntityId, item)
                        }}
                    >
                        <ListItemText key={`List-Item-Text-${index}`}>{item}</ListItemText>
                    </MenuItem>

                ))}

            </MenuList>
        </Paper>
        // </div>
    );
}


export default ContextMenu