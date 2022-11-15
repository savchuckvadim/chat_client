import * as React from 'react';
import style from './Context-Menu.module.css'
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

const ContextMenu = ({
    message = null,
    entityId,
    currentEntityId,
    entityTypeOfArea,
    currentTypeOfArea,
    isActive,
    currentMenu,

    changeForwardingMessageStatus,

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


    const contextAction = (
        currentTypeOfArea, currentEntityId,
        nameOfAction
    ) => {
        if (currentTypeOfArea === 'message') {

            if (nameOfAction === 'Forward') {
                if(message && message.body){
                    changeForwardingMessageStatus(true,  message.body)
                }
                
            } else if (nameOfAction === 'Edit') {

                //TODO THUNK-API method upadate message
            } else if (nameOfAction === 'Forward') {

            }
        }

    }
    return (
        // <div  className={style.container}>
        <Paper style={dinamicStyle} className={style.container}>
            <MenuList>
                {currentMenu.map((item, index) => (
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