import UsersContainer from '../../../../../Users/Users-Container'
import style from './Forward-Message.module.css'


const ForwardMessage = (props) => {

    return (props.isForwardedMessage && <>
        <div className={style.container}
            onClick={() =>
                {props.changeForwardingMessageStatus(false)}
            }
            onContextMenu={(e) => {
                e.preventDefault()
                props.changeForwardingMessageStatus(false)
            }}
        >

        </div>
        <div className={style.users__card}>
            <UsersContainer />
        </div>
    </>
    )
}

export default ForwardMessage