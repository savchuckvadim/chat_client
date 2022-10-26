import UsersContainer from '../../../../../Users/Users-Container'
import style from './Add-Partisipants-Area.module.css'
import PartisipantsButtons from './Partisipants-Buttons/Partisipants-Buttons'
import PartisipantsButtonsCobtainer from './Partisipants-Buttons/Partisipants-Buttons-Container'

const AddPartisipantsArea = (props) => {

    return (
        <div className={style.container}>
            <div className={style.upArea}>
                <input
                    className={style.dialogsName}
                    placeholder='Dialogs Name'
                ></input>
                <PartisipantsButtonsCobtainer />

            </div>

            <UsersContainer />
        </div>
    )
}

export default AddPartisipantsArea