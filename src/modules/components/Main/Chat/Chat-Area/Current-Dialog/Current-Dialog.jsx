import { useEffect } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import style from './Current-Dialog.module.css'
import MessagesContainer from './Messages/Messages-Container'
import SendMessage from './Send-Message/Send-Message'



const CurrentDialog = (props) => {
    useEffect(() => {
        
        if (props.params.dialogId === undefined) { // в url нет параметра dialogId

            if (props.currentDialogId !== undefined) {

                return <Navigate replace to={`../chat/${props.currentDialogId}`} />
            }
        } 
        // else {  //в url есть dialogId
        //     if (props.params.dialogId !== props.currentDialogId) { // параметр url dialogId не равен id текущего диалога из state

        //     }
        // }
    }, [])


    return (
        <div className={style.container}>
            <MessagesContainer />
            <SendMessage />
        </div>
    )
}

export default CurrentDialog