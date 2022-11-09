import style from './User-Button.module.css'


// const UserButton = (props) => {
const UserButton = ({
    authUser,
    user,
    dialog = null,
    addingParticipantsInProgress,
    participant = false, // participant={true} in create groupe dialog
    isMessageForwarding,
    forwardingBody,
    addDeleteContact = null, // if addingParticipantsInProgress === false,
    setParticipant = null, // add/delete participants of creating groupe chat, if addingParticipantsInProgress === false,
    sendMessage

}) => {


    let buttonStyle = style.contact
    let buttonName = '+add contact'
    let onButtonClick = addDeleteContact


    if (!participant) {
        if (user.isContacted) {

            buttonStyle = style.nocontact
            buttonName = 'del contact'


            if (addingParticipantsInProgress) {
                buttonName = 'add to group'
                onButtonClick = () => { setParticipant(user, true) }
            }

            if (isMessageForwarding) {
                buttonName = 'send'
            }
        } else {

        }
    } else {
        buttonName = 'delete'
        onButtonClick = () => { setParticipant(user, false) }
    }
    if (isMessageForwarding) {
        buttonName = 'send'
        onButtonClick = () => {
            
            sendMessage(
                authUser.id,
                dialog.isGroup,
                dialog.dialogId,
                forwardingBody,
                true  //isForwarded
            )
        }
    }

    return (<button
        className={buttonStyle}
        onClick={() => { onButtonClick(user, !user.isContacted) }}
    >{buttonName}
    </button>
    )
}
export default UserButton