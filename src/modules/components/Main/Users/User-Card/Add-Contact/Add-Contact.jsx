import style from './Add-Contact.module.css'


const AddContact = (props) => {
    let buttonStyle = style.contact
    let buttonName = '+add contact'
    let onButtonClick = props.addContact
    if (props.isContacted) {
        buttonStyle = style.nocontact
        buttonName = 'del contact'
        onButtonClick = props.deleteContact
    } else {
        
    }

    return (<button
        className={buttonStyle}
        onClick={() => { onButtonClick(props.userId) }}
    >{buttonName}
    </button>
    )
}
export default AddContact