import AddContact from './Add-Contact/Add-Contact'
import style from './User-Card.module.css'

const UserCard = (props) => {
    
    let button = <AddContact
        user={props.user}
        userId={props.userId}
        isContacted={props.isContacted}
        addContact={props.addContact}
        deleteContact={props.deleteContact}
        addingParticipantsInProgress={props.addingParticipantsInProgress}
        participantsNewGroupDialog={props.participantsNewGroupDialog}
    />
    if (props.addingParticipantsInProgress) {
        
        if(props.participant){
            button = <AddContact
            user={props.user}
            participantsNewGroupDialog={props.participantsNewGroupDialog}
            addingParticipantsInProgress={props.addingParticipantsInProgress}
            participant={props.participant}
            
        />
        }else{
            button = <AddContact
            user={props.user}
            userId={props.userId}
            isContacted={props.isContacted}
            addContact={props.addContact}
            deleteContact={props.deleteContact}
            addingParticipantsInProgress={props.addingParticipantsInProgress}
            participantsNewGroupDialog={props.participantsNewGroupDialog}
        />
        }
        
    }
    return (
        <div className={style.container}>
            <p>{props.name}</p>
            {button}
        </div>
    )

}

export default UserCard