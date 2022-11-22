import { useState } from 'react'
import Moment from 'react-moment'
import style from './Current-Dialog.module.css'
import MessagesContainer from './Messages/Messages-Container'
import SendMessage from './Send-Message/Send-Message'
import SoundStatusContainer from './Sound/SoundStatus-Container'



const CurrentDialog = ({ currentDialog }) => {



    return (<div className={style.container}>
        <div className={style.header}>
            {currentDialog && currentDialog.dialogsUsers[0] &&
                <div className={style.header__container}>
                    <div className={style.info}>
                        <p className={style.name}>{
                            currentDialog &&
                            (currentDialog.dialogName
                                || currentDialog.dialogsUsers[0].name)
                        } </p>

                        {

                            currentDialog.dialogsUsers[0].isActive
                                ? <p className={style.date}>online</p>
                                : <Moment className={style.date} fromNow>{currentDialog.dialogsUsers[0].update}</Moment>
                        }
                    </div>

                    <SoundStatusContainer />
                </div>
            }

        </div>

        <MessagesContainer />
        <SendMessage />
    </div>
    )
}

export default CurrentDialog