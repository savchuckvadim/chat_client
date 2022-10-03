import SendMessageForm from './Form/Send-Message-Form'
import style from './Send-Message.module.css'



const SendMessage = () => {

    return (
        <div className={style.container}>
            <SendMessageForm />
        </div>
    )
}

export default SendMessage