import React, { useState } from 'react'
import style from './Input-Message.module.css'

const InputMessage = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => {

    const [value, setValue] = useState('Input Message')
    const inputRef = React.createRef()

    return (
        <div className={style.input} ref={inputRef}
            contentEditable
        >
            {value}
        </div>
    )
}

export default InputMessage