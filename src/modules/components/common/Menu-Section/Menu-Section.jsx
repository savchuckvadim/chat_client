import style from "./Menu-Section.module.css"


const MenuSection = ({
    authUser,
    sectionName,
    name,
    value,
    actionName,
    action = null
}) => {

    return authUser
            ?( <div className={style.frame}>
           
            <h2 className={style.title}>{sectionName} </h2>
            <div className={style.items}>
                <div className={style.item}>
                    <div className={style.status}>
                        <h3 className={style.name}>{`${name}:  `}</h3>
                        <h3 className={style.value}>{value}</h3>
                    </div>
                    <div className={style.action__wrapper}>
                        <h3 onClick={() => {
                            action('new name', authUser.id)
                        }} className={style.action}>{actionName}</h3>
                    </div>
                </div>

            </div>
        </div>)
    : null
        
    
}

export default MenuSection