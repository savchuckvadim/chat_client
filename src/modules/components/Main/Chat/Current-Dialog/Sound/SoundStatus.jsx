import { useEffect, useRef } from 'react'
import { useState } from 'react'
import style from './SoundStatus.module.css'


const SoundPreloader = (props) => {
    // const [value, setValue] = useState('')
    const [count, setCount] = useState(1)
    const [trigger, setTrigger] = useState(false);
    let value = '.'
    if(!trigger){
        if (count === 0) {
            value = ''
        } else if (count === 1) {
            value = '    .'
        } else if (count === 2) {
            value = ' . .'
        } else if (count === 3) {
            value = ' . . .'
        }
    }else{
        if (count === 0) {
            value = ''
        } else if (count === 1) {
            value = ' .    '
        } else if (count === 2) {
            value = ' . .  '
        } else if (count === 3) {
            value = ' . . .'
        }
    }
    

    useEffect(() => {

        const id = setInterval(() => {

            if (!trigger) {
                if (count < 3) {

                    setCount(count + 1)
                } else {

                    setCount(count - 1)
                    setTrigger(true)
                }

            } else {
                if (count > 0) {

                    setCount(count - 1)
                } else {
                    setCount(count + 1)
                    setTrigger(false)
                }

            }


        }, 700);
        return () => clearInterval(id);
    }, [count])
    console.log(trigger)
    console.log(count)
    return (
        <p className={style.sound__on}

        >{value}</p>

    )
}

const SoundStatus = (props) => {

    const [value, setValue] = useState(true) //todo props.dialog.isSound
    const [isPending, setIsPending] = useState(false)
  

    let status = !value ? 'Off' : 'On'
    let soundClass = !value ? style.sound__off : style.sound__on
    
    useEffect(() => {
        setIsPending(false)
    }, [props.currentDialog.isSound])


    if (props.currentDialog) {
        if (props.currentDialog.isSound !== value) {
            setValue(props.currentDialog.isSound)
        }
        const submit = async () => {

            if (props.currentDialog && !isPending) {

                setValue(!props.currentDialog.isSound)
                setIsPending(true)
                await props.changeDialogSound(props.currentDialog.dialogId, !props.currentDialog.isSound)
                setIsPending(false)
            }

        }
        return (
            <div className={style.sound}>
                <p className={style.sound__name}>Sound: </p>
                {
                    !isPending ?
                        <p className={soundClass}
                            onClick={submit}
                        >{status}</p>
                        : <SoundPreloader />

                }

            </div>
        )
    } else {
        return null
    }
}


export default SoundStatus