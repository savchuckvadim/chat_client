import SendMessageForm from './Form/Send-Message-Form'
import SendMessageFormContainer from './Form/Send-Message-Form-Container'
import style from './Send-Message.module.css'



const SendMessage = () => {

    return (
        <div className={style.container}>
            <SendMessageFormContainer />
        </div>
    )
}

export default SendMessage