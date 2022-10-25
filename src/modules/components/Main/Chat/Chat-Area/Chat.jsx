import { useEffect } from 'react'
import { echo } from '../../../../services/websocket/socket'
import style from './Chat.module.css'
import CurrentDialog from './Current-Dialog/Current-Dialog'
import CurrentDialogContainer from './Current-Dialog/Current-Dialog-Container'
import DialogsContainer from './Dialogs/Dialogs-Container'

const Chat = (props) => {

    useEffect(() => {
        echo.private('new-message')
            .listen('.SendMessage', (e) => {
                console.log(e)
                debugger
                props.setNewMessage(e.message, props.authUserId)
                // alert(e.message.body)
               
            })
    }, [])


    return (
        <div className={style.container}>
            <div className={style.dialogs}>
                <DialogsContainer />
            </div>
            <div className={style.currentDialog}>
                <CurrentDialogContainer />
            </div>
        </div >

    )
}

export default Chat