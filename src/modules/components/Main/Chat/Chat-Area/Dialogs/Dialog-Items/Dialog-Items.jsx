import DialogItem from './Dialog-Item/Dialog-Item'
import style from './Dialog-Items.module.css'

const DialogItems = (props) => {
    
    return (
        <div className={style.outer__container}>
            <div className={style.inner__container}>
                <div className={style.items}>
                   
                    {props.dialogs.map((dialog, index) => (
                        <DialogItem key={`dialog-${index}`}
                            dialog={dialog}
                            isContextMenuActive={props.isContextMenuActive}
                            currentTypeOfArea={props.currentTypeOfArea}
                            currentMenu={props.currentMenu}
                            currentEntityId={props.currentEntityId}
                            contextMenuToggler={props.contextMenuToggler}
                            changeCurrentDialog={props.changeCurrentDialog}
                        />))}

                </div>
            </div>
        </div>
    )
}

export default DialogItems

