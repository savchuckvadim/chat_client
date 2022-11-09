import UserButton from './Add-Contact/User-Button'
import style from './User-Card.module.css'

const UserCard = (props) => {
    
//TODO:
    if (props.isMessageForwarding) {
    }


    return (
        <div className={style.container}>
            <p>{props.user.name}</p>
            <UserButton
                user={props.user}
                addingParticipantsInProgress={props.addingParticipantsInProgress}
                participant={props.participant}
                addDeleteContact={props.addDeleteContact}
                setParticipant={props.setParticipant}
            />
        </div>
    )

}

export default UserCard