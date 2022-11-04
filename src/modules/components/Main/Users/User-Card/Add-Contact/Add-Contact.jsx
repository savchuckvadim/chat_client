import style from './Add-Contact.module.css'


const AddContact = (props) => {
    
    let buttonStyle = style.contact
    let buttonName = '+add contact'
    let onButtonClick = props.addContact
    if(!props.participant){
        if (props.isContacted) {
            buttonStyle = style.nocontact
            buttonName = 'del contact'
            onButtonClick = props.deleteContact
            
            if (props.addingParticipantsInProgress) {
                buttonName = 'add to group'
                onButtonClick = () => { props.participantsNewGroupDialog(props.user, true) }
            }
        } else {
           
        }
    }else{
        buttonName = 'delete!!!'
        onButtonClick = () => { props.participantsNewGroupDialog(props.user, false) }
    }
    

    return (<button
        className={buttonStyle}
        onClick={() => { onButtonClick(props.userId) }}
    >{buttonName}
    </button>
    )
}
export default AddContact