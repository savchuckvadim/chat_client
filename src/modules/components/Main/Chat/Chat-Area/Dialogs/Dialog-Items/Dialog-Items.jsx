import DialogItem from './Dialog-Item/Dialog-Item'
import style from './Dialog-Items.module.css'

const DialogItems = (props) => {

    return (
        <div className={style.outer__container}>
            <div className={style.inner__container}>
                <div className={style.items}>
                    {//TODO  from creating validate to uniquie dialog on backend
                    }
                    {props.dialogs.map((dialog, index) => (
                        <DialogItem key={`dialog-${index}`}
                            dialog={dialog}
                            isContextMenuActive={props.isContextMenuActive}
                            xPos={props.xPos}
                            yPos={props.yPos}
                            currentMenu={props.currentMenu }
                            currentEntityId={props.currentEntityId }
                            changeCurrentDialog={props.changeCurrentDialog}
                            contextMenuToggler={props.contextMenuToggler}


                        />))}

                </div>
            </div>
        </div>
    )
}

export default DialogItems

