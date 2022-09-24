import style from './User-Card.module.css'
const UserCard = (props) => {

    return (
        <div className={style.container}>
            <p>{props.name}</p>
            <button className={style.button}>add contact</button>
        </div>
    )

}

export default UserCard