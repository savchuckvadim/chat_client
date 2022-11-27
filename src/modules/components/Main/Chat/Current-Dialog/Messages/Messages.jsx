import React, { useLayoutEffect, useRef } from 'react'
import MessageItem from './Message-Item/Message-Item'
import style from './Messages.module.css'
import ScrollIntoView from 'react-scroll-into-view'
import NoMessages from './NoMessages/NoMessages'
import { motion, useScroll, useSpring } from "framer-motion";
import ForwardMessage from './Forward-Message/Forward-Message'


const Messages = (props) => {
    let containerClass = props.isSending === 'sending' ? style.container__sending : style.container

    let ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end"],
        default: ["end end"]
    })
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    useLayoutEffect(() => {
        // scrollYProgress()
        if (ref.current && props.messages.length > 0) {

            ref.current.scrollIntoView(0, 0);
        }

    }, [props.messages]);

    return (
        <div className={containerClass}
            onClick={() => {
                if (props.isContextMenuActive) {
                    // console.log('contextMenuToggler')
                    props.contextMenuToggler(false)
                }
            }}
        >
            {/* <ScrollIntoView selector="#messages"> */}

            <div className={style.messages}
                
            // style={{ scaleX }}
            >
                
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
            {/* </ScrollIntoView> */}
        </div>
    )
}

export default Messages