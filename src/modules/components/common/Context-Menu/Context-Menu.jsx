import style from './Context-Menu.module.css'

const ContextMenu = ({ typeOfArea, isActive, xPos, yPos, currentMenu, contextMenuToggler }) => {

    let dinamicStyle = {
        display: isActive ? 'flex' : 'none',
        top: xPos,
        left: yPos,
    }
    return (
        <div style={dinamicStyle} className={style.container}>
            {currentMenu.map(item => (<div>{item}</div>))}
        </div>
    )
}

export default ContextMenu