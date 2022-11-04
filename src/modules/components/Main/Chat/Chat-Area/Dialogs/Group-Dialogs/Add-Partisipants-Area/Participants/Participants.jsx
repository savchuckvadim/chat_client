import style from './Participants.module.css'
import UserCard from '../../../../../../Users/User-Card/User-Card'

const Participants = (props) => {
    
    return (
        <div>
            {props.participants.length > 0 && props.participants.map(participant =>
                <UserCard
                    key={participant.id}
                    user={participant}
                    name={participant.name}
                    userId={participant.id}
                    participant={true}
                    addingParticipantsInProgress={props.addingParticipantsInProgress}
                    participantsNewGroupDialog={props.participantsNewGroupDialog}

                />)}
        </div>
    )
}

export default Participants