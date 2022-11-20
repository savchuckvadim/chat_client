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
          <div className={style.title__wrapper}>
            <h3 className={style.title}>Users</h3>
          </div>

          <div className={style.users}>
            <SearchContainer />
            {
              !props.inProgress
                ? <div className={style.cards__wrapper}>
                  {props.users.map(user => <UserCard
                    key={user.id}
                    user={user}
                    addingParticipantsInProgress={props.addingParticipantsInProgress}
                    participant={props.participant}
                    addDeleteContact={props.addDeleteContact}
                    setParticipant={props.setParticipant}
                    isMessageForwarding={props.isMessageForwarding}
                  />)}
                </div>
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
              ? <div className={style.cards__wrapper}>
                {props.dialogs.map(dialog => <UserCard
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

                />)}
              </div>
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
        <h3 className={style.title}>Contacts</h3>
        <SearchContainer />
        <div className={style.users}>
          {
            !props.inProgress
              ? <div className={style.cards__wrapper}>
                {contacts.map(user => <UserCard
                  key={user.id}
                  user={user}
                  userId={user.id}
                  name={user.name}
                  isContacted={user.isContacted}
                  addDeleteContact={props.addDeleteContact}
                  // deleteContact={props.deleteContact}
                  addingParticipantsInProgress={props.addingParticipantsInProgress}
                  setParticipant={props.setParticipant}
                />)}
              </div>
              : <Preloader />
          }
        </div>
      </div>

    )
  }



}

export default Users