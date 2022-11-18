import { Link, NavLink } from 'react-router-dom'
import style from './Email-Verification.module.css'

const EmailVerification = (props) => {
let domen = props.authUser && props.authUser.email.split('@').pop()
    return (
        <div className={style.container}>
            <a  href={`https://www.${domen}`} >
                Подтведите адрес электронной почты
            </a>
        </div>
    )
}
export default EmailVerification