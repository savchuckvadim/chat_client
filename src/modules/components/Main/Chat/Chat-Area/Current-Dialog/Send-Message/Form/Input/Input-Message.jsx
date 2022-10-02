import style from './Input-Message.module.css'

const InputMessage = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
  }) => {

    return(
        <div className={style.input}>
Input Message
        </div>
    )
}

export default InputMessage