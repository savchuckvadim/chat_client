import { Navigate, NavLink } from 'react-router-dom'
import style from './Current-Dialog.module.css'
import MessagesContainer from './Messages/Messages-Container'
import SendMessage from './Send-Message/Send-Message'



const CurrentDialog = (props) => {
    if (props.params.dialogId === undefined) {
        
        if (props.currentDialogId !== undefined) {
            
            return <Navigate replace to={`../chat/${props.currentDialogId}`} />
        }
    }

    return (
        <div className={style.container}>
            <MessagesContainer />
            <SendMessage />
        </div>
    )
}

export default CurrentDialog