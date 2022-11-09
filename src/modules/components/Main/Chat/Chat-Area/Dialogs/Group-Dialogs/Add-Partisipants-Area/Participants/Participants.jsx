import style from './Participants.module.css'
import UserCard from '../../../../../../Users/User-Card/User-Card'

const Participants = (props) => {
    
    return (
        <div className={style.container}>
            <div className={style.cards__wrapper}>
            {props.participants.length > 0 && props.participants.map(participant =>
                <UserCard
                    key={participant.id}
                    user={participant}
                    
                    participant={true}
                    addingParticipantsInProgress={props.addingParticipantsInProgress}
                    setParticipant={props.setParticipant}

                />)}
            </div>
            
        </div>
    )
}

export default Participants