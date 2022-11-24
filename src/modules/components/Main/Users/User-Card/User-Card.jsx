import { NavLink } from 'react-router-dom'
import UserButton from './User-Button/User-Button'
import style from './User-Card.module.css'

const UserCard = (props) => {

    //TODO:
    if (props.isMessageForwarding) {
    }
    let name = props.user.name.length > 12
        ? `${props.user.name.slice(0, 12)}...`
        : props.user.name
    
    return (
        <div
            style={{
                height: props.isMessageForwarding || props.addingParticipantsInProgress ? 100 : 200,

                width: props.isMessageForwarding || props.addingParticipantsInProgress ? '50px' : '108px',
                margin: props.isMessageForwarding ? 2 : 2,

            }} className={style.container}
            key={`user-card=container-${props.user.id}`}
        >
            {props.user.dialogWidthAuthId
                ? <NavLink className={style.name__link} replace to={`../chat/${props.user.dialogWidthAuthId}`}>{name}</NavLink>
                : <p className={style.name}>{name}</p>
            }
            {props.user.isActive && <p className={style.online}>online</p>}
            <UserButton
                authUser={props.authUser}
                user={props.user}
                addingParticipantsInProgress={props.addingParticipantsInProgress}
                participant={props.participant}
                addDeleteContact={props.addDeleteContact}
                setParticipant={props.setParticipant}
                isMessageForwarding={props.isMessageForwarding}
                forwardingBody={props.forwardingBody}
                dialog={props.dialog} //dialog or undefined
                sendMessage={props.sendMessage}
            />
        </div>
    )

}

export default UserCard