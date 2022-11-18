
import ForwardMessageContainer from '../../Main/Chat/Chat-Area/Current-Dialog/Messages/Forward-Message/Forward-Message-Container'
import Menu from '../../Main/Chat/Menu/Menu'
import style from './Modal.module.css'


const Modal = (props) => {

    return (props.isModalActive && <>
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
            {!props.isMessageForwarding ? <Menu isModal={true} logout={props.logout}  changeForwardingMessageStatus={props.changeForwardingMessageStatus} /> : <ForwardMessageContainer/>}
          
        </div>


    </>
    )
}

export default Modal