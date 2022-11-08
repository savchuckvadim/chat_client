
export const onRightClick = (e, isActive, type, currentEntityId, contextMenuToggler) => {
    if (e) {
        e.preventDefault()
        const xPos = e.pageX + "px";
        const yPos = e.pageY + "px"
        contextMenuToggler(true, isActive, type, xPos, yPos, currentEntityId)

    }
}