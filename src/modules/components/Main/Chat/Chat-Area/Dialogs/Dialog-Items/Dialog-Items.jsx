import DialogItem from './Dialog-Item/Dialog-Item'
import style from './Dialog-Items.module.css'

const DialogItems = (props) => {

    return (
        <div className={style.outer__container}>
            <div className={style.inner__container}>
                <div className={style.items}>
                    {props.dialogs.map(dialog => (<DialogItem dialog={dialog} />))}
                    {props.dialogs.map(dialog => (<DialogItem dialog={dialog} />))}
                    {props.dialogs.map(dialog => (<DialogItem dialog={dialog} />))}
                </div>
            </div>
        </div>
    )
}

export default DialogItems

