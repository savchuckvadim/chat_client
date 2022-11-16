import style from './Partisipants-Buttons.module.css'

const PartisipantsButtons = (props) => {

    return (
        <div className={style.buttons__wrapper}>
            <button className={style.button}
                onClick={() => { props.addParticipantsCancel() }}
            >
                cancel
            </button>
            <button className={style.button}
                onClick={() => { props.addNewGroupDialog(props.participants, props.name, props.dialogId) }}
            >
                save
            </button>
        </div>
    )
}

export default PartisipantsButtons