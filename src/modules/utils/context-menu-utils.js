
export const onRightClick = (e, isActive, type, currentEntityId, contextMenuToggler) => {
    if (e) {
        e.preventDefault()

        contextMenuToggler(isActive, type, currentEntityId)

    }
}