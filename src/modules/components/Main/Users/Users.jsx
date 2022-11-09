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
    if (!props.isMessageForwarding) {
      return (

        <div className={style.container}>
          <h3>Users</h3>


          <div className={style.users}>
            <SearchContainer />
            {
              !props.inProgress
                ? props.users.map(user => <UserCard
                  key={user.id}
                  user={user}
                  addingParticipantsInProgress={props.addingParticipantsInProgress}
                  participant={props.participant}
                  addDeleteContact={props.addDeleteContact}
                  setParticipant={props.setParticipant}
                  isMessageForwarding={props.isMessageForwarding}
                />)
                : <Preloader />
            }
          </div>
        </div>

      )
    } else {
      return (
        <div className={style.users}>
          <SearchContainer />
          {
            !props.inProgress
              ? props.dialogs.map(dialog => <UserCard
                key={dialog.id}
                user={dialog.dialogsUsers[0]}
                addingParticipantsInProgress={props.addingParticipantsInProgress}
                participant={props.participant}
                isMessageForwarding={props.isMessageForwarding}

                authUser={props.authUser}
                dialog={dialog}
                forwardingBody={props.forwardingBody}
                addDeleteContact={props.addDeleteContact}
                setParticipant={props.setParticipant}
                sendMessage={props.sendMessage}
               
              />)
              : <Preloader />
          }
        </div>
      )






    }

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
        <SearchContainer />
        <div className={style.users}>
          {
            !props.inProgress
              ? contacts.map(user => <UserCard
                key={user.id}
                user={user}
                userId={user.id}
                name={user.name}
                isContacted={user.isContacted}
                addDeleteContact={props.addDeleteContact}
                // deleteContact={props.deleteContact}
                addingParticipantsInProgress={props.addingParticipantsInProgress}
                setParticipant={props.setParticipant}
              />)
              : <Preloader />
          }
        </div>
      </div>

    )
  }



}

export default Users