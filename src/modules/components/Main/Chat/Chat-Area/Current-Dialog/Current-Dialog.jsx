import style from './Current-Dialog.module.css'
import MessagesContainer from './Messages/Messages-Container'
import SendMessage from './Send-Message/Send-Message'



const CurrentDialog = () => {

    return (
        <div className={style.container}>
            <MessagesContainer />
            <SendMessage />
        </div>
    )
}

export default CurrentDialog