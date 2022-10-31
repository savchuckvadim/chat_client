import React, { useLayoutEffect, useRef } from 'react'
import { useEffect } from 'react'
import MessageItem from './Message-Item/Message-Item'
import style from './Messages.module.css'

const Messages = (props) => {
    let ref  = useRef(null)
    useLayoutEffect(() => {
        ref.current.scrollIntoView(0,0);
      }, []);
    return (
        <div className={style.container}  >
            <div className={style.messages}
           ref={ref}
            >
                {props.messages && props.messages.length > 0 && props.messages.map(message => (<MessageItem message={message}/>))}
            </div>
        </div>
    )
}

export default Messages