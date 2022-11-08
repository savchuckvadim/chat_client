import DialogItems from './Dialog-Items/Dialog-Items'
import style from './Dialogs.module.css'


const Dialogs = (props) => {

    const allDialogs = [
        {
            title: <h4 className={style.title}>  dialogs</h4>,

            dialogs: < div className={style.dialogs} >
                <DialogItems
                    dialogs={props.dialogs}
                    isContextMenuActive={props.isContextMenuActive}
                    xPos={props.xPos}
                    yPos={props.yPos}
                    currentMenu={props.currentMenu}
                    currentEntityId={props.currentEntityId}
                    changeCurrentDialog={props.changeCurrentDialog}
                    contextMenuToggler={props.contextMenuToggler}
                />

            </div>
        },
        {
            title: <h4 className={style.title__group}
                onClick={() => {

                    props.addParticipantsInProgress(true)
                }}
            >  group-dialogs+</h4>,

            dialogs: < div className={style.dialogs} >
                <DialogItems
                    dialogs={props.groupDialogs}
                    isContextMenuActive={props.isContextMenuActive}
                    xPos={props.xPos}
                    yPos={props.yPos}
                    currentMenu={props.currentMenu}
                    currentEntityId={props.currentEntityId}
                    changeCurrentDialog={props.changeCurrentDialog}
                    contextMenuToggler={props.contextMenuToggler}
                />

            </div>
        },

    ]

    return (
        <div className={style.container}>

            {allDialogs[0].title}
            {allDialogs[0].dialogs}
            {allDialogs[1].title}
            {allDialogs[1].dialogs}

        </div>
    )
}
export default Dialogs