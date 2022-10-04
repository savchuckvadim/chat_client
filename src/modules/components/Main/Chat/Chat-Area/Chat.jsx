import style from './Chat.module.css'
import CurrentDialog from './Current-Dialog/Current-Dialog'
import CurrentDialogContainer from './Current-Dialog/Current-Dialog-Container'
import DialogsContainer from './Dialogs/Dialogs-Container'

const Chat = () => {

    return (
        <div className={style.container}>
            <div className={style.dialogs}>
                <DialogsContainer />
            </div>
            <div className={style.currentDialog}>
                <CurrentDialogContainer />
            </div>
        </div >

    )
}

export default Chat