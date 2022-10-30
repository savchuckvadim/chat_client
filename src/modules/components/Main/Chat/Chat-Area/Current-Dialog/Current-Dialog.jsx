import { useEffect } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import style from './Current-Dialog.module.css'
import MessagesContainer from './Messages/Messages-Container'
import SendMessage from './Send-Message/Send-Message'



const CurrentDialog = (props) => {

    return (
        <div className={style.container}>
            <MessagesContainer />
            <SendMessage />
        </div>
    )
}

export default CurrentDialog