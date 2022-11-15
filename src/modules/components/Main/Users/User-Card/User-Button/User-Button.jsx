import { Navigate, NavLink } from 'react-router-dom'
import style from './User-Button.module.css'


// const UserButton = (props) => {
const UserButton = ({
    authUser,
    user,
    dialog = null,
    addingParticipantsInProgress,
    participant = false, // participant={true} in create group dialog
    isMessageForwarding,
    forwardingBody,
    addDeleteContact = null, // if addingParticipantsInProgress === false,
    setParticipant = null, // add/delete participants of creating groupe chat, if addingParticipantsInProgress === false,
    sendMessage

}) => {


    let buttonStyle = style.contact
    let buttonName = '+add contact'
    let onButtonClick = addDeleteContact


    if (!participant) {  //NO 
        if (user.isContacted) {
            buttonStyle = style.nocontact
            buttonName = 'del contact'

            if (addingParticipantsInProgress) {
                buttonName = 'add to group'
                onButtonClick = () => { setParticipant(user, true) }
            }
        } else {

        }
    } else { // 
        buttonName = 'delete'
        onButtonClick = () => { setParticipant(user, false) }
    }

    if (isMessageForwarding && user.isContacted) {
        buttonName = 'send'
        buttonStyle = style.contact
        onButtonClick = () => {

            sendMessage(
                dialog.dialogId,
                forwardingBody,
                true,  //isForwarded
                false //isEdited
            )

        }
        return (<NavLink to={`chat/${dialog.dialogId}`}
            onClick={() => { 
                
                onButtonClick(user, !user.isContacted) }}
        >
            <button
                className={buttonStyle}

            >{buttonName}
            </button>
        </NavLink>
        )
    }

    return (<button
        className={buttonStyle}
        onClick={() => { onButtonClick(user, !user.isContacted) }}
    >{buttonName}
    </button>
    )
}
export default UserButton