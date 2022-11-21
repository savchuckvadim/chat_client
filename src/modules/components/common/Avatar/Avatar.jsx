import style from './Avatar.module.css'

const Avatar = ({ name }) => {
   
    let initials = `${name[0]}${name[name.length - 1]}`.toUpperCase()
    return (
        <div className={style.avatar}>
            <p className={style.initials}>{initials}</p>
        </div>
    )
}

export default Avatar