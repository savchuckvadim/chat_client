import { useState } from "react"
import style from "./Menu-Section.module.css"
import { Field, Formik } from "formik";


const ChangeNameSubmit = ({ actionName, status, setStatus }) => {

    return (
        <div className={style.action__wrapper}>
            {
                status
                    ? <button type="submit"
                        className={style.action}>{'send'}</button>
                    : <h3 onClick={() => {
                        setStatus(true)
                    }} className={style.action}>{actionName}</h3>
            }

        </div>
    )
}

const ChangeSoundSubmit = ({ actionName }) => {

    return (
        <div className={style.action__wrapper}>
            {
                <button type='submit' onClick={() => {

                }} className={style.action}>{actionName}</button>
            }


        </div>
    )
}

const MenuSection = ({
    authUser,
    sectionName,
    name,
    value,
    actionName,
    action = null
}) => {

   
    const [status, setStatus] = useState(false)
    let initialValues
    let parametersName
    if (name === 'Sound') {
        initialValues = { 'sound': value }
        parametersName = 'sound'
    } else {
        initialValues = { 'user-name': value }
        parametersName = 'user-name'
    }

  

    return authUser
        ? (<Formik
            initialValues={initialValues}
            // validate={values => {
            //     const errors = {};
            //     errors[`${parametersName}`] = 'Hе заполнено!';

            //     return errors;
            // }}
            onSubmit={(values, { setSubmitting }) => {
                if (name === 'Sound') {
                    if (value === 'On') {
                        action(false)
                    } else {
                        action(true)
                    }

                } else {
                    if (status) {

                        action(values[`${parametersName}`])
                        setStatus(false)
                    } else {
                        setStatus(true)
                    }
                }


            }}
        >{({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,

        }) => (
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.frame} >

                    <h2 className={style.title}>{sectionName} </h2>
                    <div className={style.items}>
                        <div className={style.item}>
                            <div className={style.status}>
                                <h3 className={style.name}>{`${name}:  `}</h3>
                                {status && name !== 'Sound'
                                    ? <input className={style.value}
                                        value={values[`${parametersName}`]}
                                        type={parametersName}
                                        name={parametersName}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    : <h3 className={style.value}>{
                                        name !== 'Sound'
                                        ? values[`${parametersName}`]
                                        : value
                                    }</h3>
                                }
                               
                            </div>
                            {name !== 'Sound'
                                ? <ChangeNameSubmit actionName={actionName} status={status} setStatus={setStatus} />
                                : <ChangeSoundSubmit actionName={actionName} status={status} setStatus={setStatus} values={values} />}
                        </div>

                    </div>
                </div>
            </form>
        )}
        </Formik >
        )
        : null


}

export default MenuSection