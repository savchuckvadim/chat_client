import { useEffect } from 'react'
import UserCard from './User-Card/User-Card'
import style from './Users.module.css'


const Users = (props) => {

  useEffect(() => {
    props.getUsers(1, 10)
  })
  return (

    <div className={style.container}>
      <h3>Users</h3>
      <div className={style.users}>
        {
          props.users.map(user => <UserCard key={user.id} name={user.name} />)
        }
      </div>
    </div>

  )
}

export default Users