import style from './Add-Contact.module.css'


const AddContact = (props) => {
    let buttonStyle = style.contact
    let buttonName = '+add contact'
    if (props.isContacted) {
        buttonStyle = style.nocontact
        buttonName = 'del contact'
    } else {

    }
    return (
        <button
            className={buttonStyle}
            onClick={() => { props.addContact(props.userId) }}
        >{buttonName}</button>
    )
}
export default AddContact