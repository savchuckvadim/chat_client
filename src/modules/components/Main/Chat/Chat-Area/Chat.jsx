import style from './Chat.module.css'
import CurrentDialog from './Current-Dialog/Current-Dialog'
import Dialogs from './Dialogs/Dialogs'

const Chat = () => {

    return (
        <div className={style.container}>
            <div className={style.dialogs}>
                <Dialogs />
            </div>
            <div className={style.currentDialog}>
                <CurrentDialog />
            </div>
        </div >

    )
}

export default Chat