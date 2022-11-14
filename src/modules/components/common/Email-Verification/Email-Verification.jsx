import { Link, NavLink } from 'react-router-dom'
import style from './Email-Verification.module.css'

const EmailVerification = () => {

    return (
        <div className={style.container}>
            <Link reloadDocument relative={'path'} replace to={'../https://gmail.com/'}>
                Подтведите адрес электронной почты
            </Link>
        </div>
    )
}
export default EmailVerification