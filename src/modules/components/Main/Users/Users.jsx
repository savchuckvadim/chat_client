import { useEffect } from 'react'
import style from './Users.module.css'


const Users = (props) => {

  useEffect(() => {
    props.getUsers(1, 10)
  })
  return (

    <div className={style.container}>
      Users
      <div>
        {
          props.users.map(user => user.name)
        }
      </div>
    </div>

  )
}

export default Users