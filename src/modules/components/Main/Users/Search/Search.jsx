import SearchForm from './Search-Form/Search-Form'
import style from './Search.module.css'

const Search = (props) => {
    let typeOfUsers = !props.addingParticipantsInProgress
        ? 'container-users'
        : 'container-participants'

    if (!props.inProgress) {
        return (
            <div className={style[typeOfUsers]}>
                <SearchForm
                    findUser={props.findUser}
                />
            </div>
        )
    } else {
        return null
    }

}

export default Search