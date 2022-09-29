import { useEffect } from 'react'
import DialogItems from './Dialog-Items/Dialog-Items'
import style from './Dialogs.module.css'

const Dialogs = (props) => {

    useEffect(() => {
        props.getDialogs()
    }, [])
    return (
        <div className={style.container}>
            <h4 className={style.title}>  dialogs</h4>
            <div className={style.dialogs}>
                <DialogItems dialogs={props.dialogs} />
            </div>
            <div className={style.groupDialogs}>
                group dialogs
            </div>
        </div>
    )
}

export default Dialogs