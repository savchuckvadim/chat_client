import { useEffect } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import UserCard from './User-Card/User-Card'
import style from './Users.module.css'
import SearchContainer from './Search/Search-Container'

const Users = (props) => {

  useEffect(() => {
    props.getUsers(1, 10)
  }, [])
  if (!props.addingParticipantsInProgress) {
    return (

      <div className={style.container}>
        <h3>Users</h3>


        <div className={style.users}>
          <SearchContainer/>
          {
            !props.inProgress
              ? props.users.map(user => <UserCard
                key={user.id}
                userId={user.id}
                name={user.name}
                isContacted={user.isContacted}
                addContact={props.addContact}
                deleteContact={props.deleteContact}
                addingParticipantsInProgress={props.addingParticipantsInProgress}
              />)
              : <Preloader />
          }
        </div>
      </div>

    )
  } else {
    let contacts = []
    props.users.forEach(user => {
      let isParticipant = props.participants.some(p => p.id === user.id)
      if (user.isContacted && !isParticipant) {
        contacts.push(user)
      }
    });
    return (

      <div className={style.container}>
        <h3>Contacts</h3>
        {/* <Search
          inProgress={props.inProgress}
          addingParticipantsInProgress={props.addingParticipantsInProgress}
          findUser={props.findUser}
        /> */}
        <div className={style.users}>
          {
            !props.inProgress
              ? contacts.map(user => <UserCard
                key={user.id}
                user={user}
                userId={user.id}
                name={user.name}
                isContacted={user.isContacted}
                addContact={props.addContact}
                deleteContact={props.deleteContact}
                addingParticipantsInProgress={props.addingParticipantsInProgress}
                participantsNewGroupDialog={props.participantsNewGroupDialog}
              />)
              : <Preloader />
          }
        </div>
      </div>

    )
  }



}

export default Users