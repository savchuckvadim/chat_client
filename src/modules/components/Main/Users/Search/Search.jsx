import style from './Search.module.css'

const Search = (props) => {
    let typeOfUsers =  !props.addingParticipantsInProgress 
    ? 'container-users' 
    : 'container-participants' 
    if (!props.inProgress) {
        return (
            <div className={style[typeOfUsers] }>
                Search
            </div>
        )
    } else {
        return null
    }

}

export default Search