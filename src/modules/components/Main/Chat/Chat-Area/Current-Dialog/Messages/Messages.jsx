import React, { useRef } from 'react'
import { useEffect } from 'react'
import MessageItem from './Message-Item/Message-Item'
import style from './Messages.module.css'

const Messages = (props) => {
    let ref  = useRef(null)
    useEffect(() => {
        debugger
        ref.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }, [])
    return (
        <div className={style.container}>
            <div className={style.messages}
            ref={ref}
            >
                {props.messages && props.messages.length > 0 && props.messages.map(message => (<MessageItem message={message}/>))}
            </div>
        </div>
    )
}

export default Messages