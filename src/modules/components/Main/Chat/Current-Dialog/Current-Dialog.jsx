import Moment from 'react-moment'
import style from './Current-Dialog.module.css'
import MessagesContainer from './Messages/Messages-Container'
import SendMessage from './Send-Message/Send-Message'



const CurrentDialog = ({ currentDialog }) => {

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.header__container}>
                    <div className={style.info}>
                        <p className={style.name}>{
                            currentDialog &&
                            (currentDialog.dialogName
                                || currentDialog.dialogsUsers[0].name)
                        } </p>
                        {/* <p className={style.date}>  */}
                        {
                            currentDialog &&
                            currentDialog.dialogsMessages.length > 0 &&
                            <Moment className={style.date} fromNow>{currentDialog.dialogsMessages[currentDialog.dialogsMessages.length - 1].created}</Moment>
                        }
                        {/* </p> */}
                    </div>

                    <p className={style.sound}>OFF</p>
                </div>
            </div>

            <MessagesContainer />
            <SendMessage />
        </div>
    )
}

export default CurrentDialog