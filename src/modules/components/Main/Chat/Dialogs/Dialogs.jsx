import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPrecenseUser } from '../../../../redux/dialogs-reducer'
import DialogItems from './Dialog-Items/Dialog-Items'
import style from './Dialogs.module.css'


const Dialogs = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        
       dispatch(setPrecenseUser(props.online))
    }, [props.online])


    const allDialogs = [
        {
            title: <h4 className={style.title}>  dialogs</h4>,

            dialogs: < div className={style.dialogs} >
                <DialogItems
                    dialogs={props.dialogs}
                    isContextMenuActive={props.isContextMenuActive}
                    currentTypeOfArea={props.currentTypeOfArea}
                    currentMenu={props.currentMenu}
                    currentEntityId={props.currentEntityId}
        
                    contextMenuToggler={props.contextMenuToggler}
                    changeCurrentDialog={props.changeCurrentDialog}
                    deleteDialog={props.deleteDialog}
                    setEditingGroupDialog={props.setEditingGroupDialog}
                    addParticipantsInProgress={props.addParticipantsInProgress}
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
                    currentTypeOfArea={props.currentTypeOfArea}
                    currentMenu={props.currentMenu}
                    currentEntityId={props.currentEntityId}
        
                    contextMenuToggler={props.contextMenuToggler}
                    changeCurrentDialog={props.changeCurrentDialog}
                    deleteDialog={props.deleteDialog}
                    setEditingGroupDialog={props.setEditingGroupDialog}
                    addParticipantsInProgress={props.addParticipantsInProgress}

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