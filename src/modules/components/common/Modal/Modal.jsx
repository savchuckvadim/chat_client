
import style from './Modal.module.css'


const Modal = (props) => {

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
        <div className={style.menu}>
        {props.children}
        </div>
        {/* <div className={style.users__card}>
            {!props.isSending
                ? <UsersContainer />
                : <Preloader isForwarding={true} />
            }
        </div> */}
        
    </>
    )
}

export default Modal