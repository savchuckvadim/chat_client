import style from './Chat.module.css'
import CurrentDialog from './Current-Dialog/Current-Dialog'
import DialogsContainer from './Dialogs/Dialogs-Container'

const Chat = () => {

    return (
        <div className={style.container}>
            <div className={style.dialogs}>
                <DialogsContainer />
            </div>
            <div className={style.currentDialog}>
                <CurrentDialog />
            </div>
        </div >

    )
}

export default Chat