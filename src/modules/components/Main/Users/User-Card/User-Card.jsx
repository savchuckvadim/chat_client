import AddContact from './Add-Contact/Add-Contact'
import style from './User-Card.module.css'

const UserCard = (props) => {

    return (
        <div className={style.container}>
            <p>{props.name}</p>
            <AddContact
                userId={props.userId}
                isContacted={props.isContacted}
                addContact={props.addContact}
                deleteContact={props.deleteContact}
            />
        </div>
    )

}

export default UserCard