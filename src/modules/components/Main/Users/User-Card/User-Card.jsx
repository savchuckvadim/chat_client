import AddContact from './Add-Contact/Add-Contact'
import style from './User-Card.module.css'

const UserCard = (props) => {

    return (
        <div className={style.container}>
            <p>{props.name}</p>
           <AddContact
           isContacted={props.isContacted} 
           />
        </div>
    )

}

export default UserCard