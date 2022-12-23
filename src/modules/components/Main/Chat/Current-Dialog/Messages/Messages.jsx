import React, { useLayoutEffect, useRef } from 'react'
import MessageItem from './Message-Item/Message-Item'
import style from './Messages.module.css'
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
        <div className={containerClass}
            onClick={() => {
                if (props.isContextMenuActive) {

                    props.contextMenuToggler(false)
                }
            }}>
            <div className={style.messages}>
                {props.messages && props.messages.length > 0
                    ? props.messages.map(message => (<MessageItem
                        key={`message-${message.id}`}
                        message={message}
                        isContextMenuActive={props.isContextMenuActive}
                        currentTypeOfArea={props.currentTypeOfArea}
                        currentMenu={props.currentMenu}
                        currentEntityId={props.currentEntityId}
                        contextMenuToggler={props.contextMenuToggler}
                        changeForwardingMessageStatus={props.changeForwardingMessageStatus}
                        setEditingStatus={props.setEditingStatus}
                        deleteMessage={props.deleteMessage}

                    />))
                    : <NoMessages />

                }
                <div ref={ref}></div>
            </div>
        </div>
    )
}

export default Messages