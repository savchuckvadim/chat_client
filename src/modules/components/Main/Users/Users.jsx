import { useEffect } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import UserCard from './User-Card/User-Card'
import style from './Users.module.css'


const Users = (props) => {

  useEffect(() => {
    props.getUsers(1, 10)
  }, [])

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


}

export default Users