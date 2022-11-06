import UsersContainer from '../../../../../Users/Users-Container'
import style from './Add-Partisipants-Area.module.css'
import Participants from './Participants/Participants'
import PartisipantsButtonsContainer from './Partisipants-Buttons/Partisipants-Buttons-Container'

const AddPartisipantsArea = (props) => {

    return (
        <div className={style.container}>
            <div className={style.upArea}>
                <input
                    className={style.dialogsName}
                    placeholder='Dialogs Name'
                    onChange={(e) => { props.setGroupDialogsName(e.target.value) }}
                    value={props.newGroupDialogsName}
                ></input>
                <PartisipantsButtonsContainer />

            </div>

            <div className={style.partisipants__container}>
                <div className={style.users__wrapper}>

                    <UsersContainer />
                </div>
                <div className={style.partisipants__wrapper}>
                    <h3>Participants</h3>
                    <Participants
                        participants={props.participants}
                        addingParticipantsInProgress={props.addingParticipantsInProgress}
                        participantsNewGroupDialog={props.participantsNewGroupDialog}
                    />
                </div>

            </div>

        </div>
    )
}

export default AddPartisipantsArea