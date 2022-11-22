import { useState } from 'react'
import style from './SoundStatus.module.css'

const SoundStatus = (isSound) => {

    const [value, setValue] = useState(isSound)

    return (
        <div className={style.sound}>
            <p className={style.sound__name}>Sound: </p>
            {
                value
                    ? <p className={style.sound__on}
                        onClick={() => { setValue(!value) }}
                    >On</p>
                    : <p className={style.sound__off}
                        onClick={() => { setValue(!value) }}
                    >Off</p>
            }

        </div>
    )

}

export default SoundStatus