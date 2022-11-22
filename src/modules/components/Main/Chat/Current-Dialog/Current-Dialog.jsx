import Moment from 'react-moment'
import style from './Current-Dialog.module.css'
import MessagesContainer from './Messages/Messages-Container'
import SendMessage from './Send-Message/Send-Message'



const CurrentDialog = ({ currentDialog }) => {

    // let dialogDate = currentDialog.dialogsUsers[0].isActive
    //     ? <p className={style.date}>online</p>
    //     : <Moment className={style.date} fromNow>{currentDialog.dialogsUsers[0].updated}</Moment>
    debugger
    
    return (<div className={style.container}>
        <div className={style.header}>
            {currentDialog && currentDialog.dialogsUsers[0] &&
                <div className={style.header__container}>
                    <div className={style.info}>
                        <p className={style.name}>{
                            currentDialog &&
                            (currentDialog.dialogName
                                || currentDialog.dialogsUsers[0].name)
                        } </p>
                       
                        {
                            
                            currentDialog.dialogsUsers[0].isActive
                                ? <p className={style.date}>online</p>
                                : <Moment className={style.date} fromNow>{currentDialog.dialogsUsers[0].update}</Moment>
                        }
                    </div>

                    <p className={style.sound}>OFF</p>
                </div>
            }

        </div>

        <MessagesContainer />
        <SendMessage />
    </div>
    )
}

export default CurrentDialog