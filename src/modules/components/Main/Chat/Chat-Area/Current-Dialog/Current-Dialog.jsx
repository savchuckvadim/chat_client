import style from './Current-Dialog.module.css'
import SendMessage from './Send-Message/Send-Message'

const CurrentDialog = () => {

    return (
        <div className={style.container}>
            Current Dialog
            <SendMessage />
        </div>
    )
}

export default CurrentDialog