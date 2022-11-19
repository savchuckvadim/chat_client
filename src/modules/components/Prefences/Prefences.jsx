import style from './Prefences.module.css'


const Prefences = () => {

    return (
        <div className={style.frame}>
            <h2 className={style.title}>Prefences </h2>
            <div className={style.prefences}>
                <div className={style.parameter}>
                    <div className={style.status}>
                        <h3>Sound is:</h3>
                        <h3 className={style.parameter__value}>On</h3>
                    </div>
                    <div className={style.action}>
                        <h3 className={style.parameter__value}>OFF</h3>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Prefences