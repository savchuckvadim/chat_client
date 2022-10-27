import AddContact from './Add-Contact/Add-Contact'
import style from './User-Card.module.css'

const UserCard = (props) => {
    let button = <AddContact
        user={props.user}
        userId={props.userId}
        isContacted={props.isContacted}
        addContact={props.addContact}
        deleteContact={props.deleteContact}
        addingPartisipantsInProgress={props.addingPartisipantsInProgress}
        setUserForNewGroupDialog={props.setUserForNewGroupDialog}
    />
    if (props.addingPartisipantsInProgress) {
        button = <AddContact
            user={props.user}
            userId={props.userId}
            isContacted={props.isContacted}
            addContact={props.addContact}
            deleteContact={props.deleteContact}
            addingPartisipantsInProgress={props.addingPartisipantsInProgress}
            setUserForNewGroupDialog={props.setUserForNewGroupDialog}
        />
    }
    return (
        <div className={style.container}>
            <p>{props.name}</p>
            {button}
        </div>
    )

}

export default UserCard