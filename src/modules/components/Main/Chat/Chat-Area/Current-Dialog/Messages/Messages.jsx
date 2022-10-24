import MessageItem from './Message-Item/Message-Item'
import style from './Messages.module.css'

const Messages = (props) => {
    debugger
    return (
        <div className={style.container}>
            <div className={style.messages}>
                {props.messages && props.messages.length > 0 && props.messages.map(message => (<MessageItem message={message}/>))}
            </div>
        </div>
    )
}

export default Messages