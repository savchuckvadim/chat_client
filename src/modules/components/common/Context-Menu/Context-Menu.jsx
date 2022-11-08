import * as React from 'react';
import style from './Context-Menu.module.css'
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

const ContextMenu = ({
    entityId,
    currentEntityId,
    entityTypeOfArea,
    currentTypeOfArea,
    isActive,
    currentMenu,

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

    return (
        <div style={dinamicStyle} className={style.container}>
            <Paper >
                <MenuList>
                    {currentMenu.map((item, index) => (
                        <MenuItem key={`menu-item-${index}`}>
                            <ListItemText key={`List-Item-Text-${index}`}>{item}</ListItemText>
                        </MenuItem>

                    ))}

                </MenuList>
            </Paper>
        </div>
    );
}


export default ContextMenu