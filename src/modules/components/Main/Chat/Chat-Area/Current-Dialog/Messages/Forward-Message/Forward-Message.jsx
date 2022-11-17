import Preloader from '../../../../../../common/Preloader/Preloader'
import UsersContainer from '../../../../../Users/Users-Container'
import style from './Forward-Message.module.css'


const ForwardMessage = (props) => {

    return (props.isMessageForwarding && <>
        <div className={style.container}
            onClick={() =>
                props.changeForwardingMessageStatus(false, '')
            }
            onContextMenu={(e) => {
                e.preventDefault()
                props.changeForwardingMessageStatus(false, '')
            }}
        >

        </div>
        <div className={style.users__card}>
            {!props.isSending
                ? <UsersContainer />
                : <Preloader isForwarding={true} />
            }
        </div>
    </>
    )
}

export default ForwardMessage