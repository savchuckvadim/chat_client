import { useEffect } from 'react'
import DialogItems from './Dialog-Items/Dialog-Items'
import style from './Dialogs.module.css'
import GroupDialogs from './Group-Dialogs/Group-Dialogs'

const Dialogs = (props) => {

    useEffect(() => {
        props.getDialogs(props.authUser)
    }, [])
    
    return (
        <div className={style.container}>
            <h4 className={style.title}>  dialogs</h4>
            <div className={style.dialogs}>
                <DialogItems dialogs={props.dialogs}
                    changeCurrentDialog={props.changeCurrentDialog} />
            </div>

            <h4 className={style.title__group}
                onClick={() => { props.addPartisipantsInProgress(true) }}
            >  group-dialogs+</h4>
            <div className={style.dialogs}>
                <DialogItems dialogs={props.groupDialogs}
                    changeCurrentDialog={props.changeCurrentDialog} />
            </div>

        </div>
    )
}

export default Dialogs