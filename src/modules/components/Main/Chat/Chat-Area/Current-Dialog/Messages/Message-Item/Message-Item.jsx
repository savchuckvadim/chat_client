import style from './Message-Item.module.css'

const MessageItem = ({ message }) => {

    if (message.isAuthorIsAuth) {
        return (
            <div className={style.myMessage}>
                {message.body}
            </div>
        )
    }
    return (
        <div className={style.message}>
            {message.body}
        </div>

    )
}

export default MessageItem