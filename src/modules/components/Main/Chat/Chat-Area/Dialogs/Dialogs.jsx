import { useEffect } from 'react'
import style from './Dialogs.module.css'

const Dialogs = (props) => {

    useEffect(() => {
        props.getDialogs()
    }, [])
    return (
        <div className={style.container}>
            <h4 className={style.title}>  dialogs</h4>
            <div className={style.dialogs}>
               {props.dialogs.map(dialog => (dialog.id))}
            </div>
            <div className={style.groupDialogs}>
                group dialogs
            </div>
        </div>
    )
}

export default Dialogs