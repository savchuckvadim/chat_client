import UsersContainer from '../../../../../Users/Users-Container'
import style from './Add-Partisipants-Area.module.css'
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

                </div>

            </div>

        </div>
    )
}

export default AddPartisipantsArea