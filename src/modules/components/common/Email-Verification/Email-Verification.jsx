import { Link, NavLink } from 'react-router-dom'
import style from './Email-Verification.module.css'

const EmailVerification = () => {

    return (
        <div className={style.container}>
            <a  href={'https://gmail.com/'} >
                Подтведите адрес электронной почты
            </a>
        </div>
    )
}
export default EmailVerification