import { useState } from 'react'
import style from './SoundStatus.module.css'

const SoundStatus = (props) => {

    const [value, setValue] = useState(true)

    if (props.currentDialog) {
        if (props.currentDialog.isSound !== value) {
        setValue(props.currentDialog.isSound)
        }
        const submit = () => {
            debugger
            if (props.currentDialog) {
                setValue(!props.currentDialog.isSound)
                props.changeDialogSound(props.currentDialog.dialogId, !props.currentDialog.isSound)
            }

        }
        return (
            <div className={style.sound}>
                <p className={style.sound__name}>Sound: </p>
                {
                    value
                        ? <p className={style.sound__on}
                            onClick={submit}
                        >On</p>
                        : <p className={style.sound__off}
                            onClick={submit}
                        >Off</p>
                }

            </div>
        )
    }else{
        return null
    }
}


export default SoundStatus