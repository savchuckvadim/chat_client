import { useEffect } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import UserCard from './User-Card/User-Card'
import style from './Users.module.css'


const Users = (props) => {

  useEffect(() => {
    props.getUsers(1, 10)
  }, [])
if(!props.addingPartisipantsInProgress){
  return (

    <div className={style.container}>
      <h3>Users</h3>
      <div className={style.users}>
        {
          !props.inProgress
            ? props.users.map(user => <UserCard 
              key={user.id} 
              userId={user.id} 
              name={user.name}
              isContacted={user.isContacted} 
              addContact={props.addContact}
              deleteContact={props.deleteContact}
              />)
            : <Preloader />
        }
      </div>
    </div>

  )
}else{
  let contacts = []
  props.users.forEach(user => {
    if(user.isContacted){
      contacts.push(user)
    }
  });
  debugger
  return (

    <div className={style.container}>
      <h3>Contacts</h3>
      <div className={style.users}>
        {
          !props.inProgress
            ? contacts.map(user => <UserCard 
              key={user.id} 
              userId={user.id} 
              name={user.name}
              isContacted={user.isContacted} 
              addContact={props.addContact}
              deleteContact={props.deleteContact}
              addingPartisipantsInProgress={props.addingPartisipantsInProgress}
              />)
            : <Preloader />
        }
      </div>
    </div>

  )
}
  


}

export default Users