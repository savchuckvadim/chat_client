import React, { useLayoutEffect, useRef } from 'react'
import MessageItem from './Message-Item/Message-Item'
import style from './Messages.module.css'
import ScrollIntoView from 'react-scroll-into-view'
import NoMessages from './NoMessages/NoMessages'


const Messages = (props) => {
    let containerClass = props.isSending === 'sending' ? style.container__sending : style.container

    let ref = useRef(null)
    useLayoutEffect(() => {

        if (ref.current && props.messages.length > 0) {

            ref.current.scrollIntoView(0, 0);
        }

    }, [props.messages]);
    return (
        <div className={containerClass}  >
            {/* <ScrollIntoView selector="#messages"> */}
            <div className={style.messages}
                ref={ref}
            >
                {props.messages && props.messages.length > 0
                    ? props.messages.map(message => (<MessageItem key={`message-${message.id}`} message={message} />))
                    : <NoMessages />
                }
            </div>
            {/* </ScrollIntoView> */}
        </div>
    )
}

export default Messages