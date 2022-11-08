import * as React from 'react';
import style from './Context-Menu.module.css'
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

const ContextMenu = ({
    typeOfArea,
    isActive,
    xPos,
    yPos,
    currentMenu,
    entityId,
    currentEntityId,
    contextMenuToggler
}) => {
    const dinamicStyle = {
        display: isActive && entityId === currentEntityId ? 'flex' : 'none',
        top: 0,
        left: `calc(${xPos} - 42vw)`,
    }
    return (
        <div style={dinamicStyle} className={style.container}>
            <Paper 
            // sx={{ width: 320, maxWidth: '100%' }}

            >
                <MenuList>
                    {currentMenu.map(item => (
                        <MenuItem>
                            <ListItemText>{item}</ListItemText>
                        </MenuItem>

                    ))}

                </MenuList>
            </Paper>
        </div>
    );
}


export default ContextMenu