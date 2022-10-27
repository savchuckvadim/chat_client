import style from './Partisipants-Buttons.module.css'

const PartisipantsButtons = (props) => {

    return (
        <div className={style.buttons__wrapper}>
            <button className={style.button}>
                cancel
            </button>
            <button className={style.button}
            onClick={() => {props.addNewGroupDialog(props.usersForNewGroupDialog, props.newGroupDialogsName)}}
            >
                save
            </button>
        </div>
    )
}

export default PartisipantsButtons