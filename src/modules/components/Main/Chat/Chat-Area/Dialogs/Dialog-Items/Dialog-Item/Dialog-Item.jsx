import style from './Dialog-Item.module.css'

const DialogItem = ({ dialog }) => {

    return (
        <div className={style.item}>
            <div className={style.avatar}>
                <p className={style.initials}>CT</p>
                </div>
            <div className={style.text__wrapper}>
                <h3 className={style.name}>{dialog.name}</h3>
                <p className={style.message}>Last messge...</p>
            </div>
        </div>
    )
}

export default DialogItem