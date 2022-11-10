import UserButton from './User-Button/User-Button'
import style from './User-Card.module.css'

const UserCard = (props) => {

    //TODO:
    if (props.isMessageForwarding) {
    }


    return (
        <div
            style={{
                height: props.isMessageForwarding ? 120 : 200
            }} className={style.container}>
            <p>{props.user.name}</p>
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