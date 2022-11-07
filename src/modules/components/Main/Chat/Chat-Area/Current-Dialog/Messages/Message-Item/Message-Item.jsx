import style from './Message-Item.module.css'

const MessageItem = ({ message }) => {

    if (message.isAuthorIsAuth) {
        return (
            <div className={style.myMessage}
                onContextMenu={(e) => {
                    e.preventDefault()
                    const xPos = e.pageX + "px";
                    const yPos = e.pageY + "px";
                    console.log(xPos)
                    console.log(yPos)
                    
                }}
            >
                {message.body}
            </div >
        )
    }
    return (
        <div className={style.message}
            onContextMenu={(e) => {
                e.preventDefault()
                console.log(message.body)
                console.log(e.currentTarget.textContent)
            }}
        >
            {message.body}
        </div>

    )
}

export default MessageItem