import style from './Avatar.module.css'
import logo from '../../../../logo.svg';

const Online = () => {

    return (
        <div className={style.online__wrapper}>
            <img src={logo} className={style.logo} alt="logo" />
        </div>
    )
}

const Avatar = ({ name, isOnline }) => {

    let initials = `${name[0]}${name[name.length - 1]}`.toUpperCase()
    return (

        <div className={style.avatar}>

            {isOnline ? <Online /> : null}
            <p className={style.initials}>{initials}</p>
        </div>


    )
}

export default Avatar