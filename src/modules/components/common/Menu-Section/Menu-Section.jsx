import { useState } from "react"
import style from "./Menu-Section.module.css"
import { Formik } from "formik";

const MenuSection = ({
    authUser,
    sectionName,
    name,
    value,
    actionName,
    action = null
}) => {


    const [status, setStatus] = useState(false)
    // const [initialValue, setValue] = useState(value)

    const onAction = (name) => {
        
        if (status) {
            action(name)
            setStatus(false)
        } else {
            setStatus(true)
        }
    }
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
                
                if (status) {
                    action(values[`${parametersName}`])
                    setStatus(false)
                } else {
                    setStatus(true)
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
                                {status
                                    ? <input className={style.value}
                                        value={values[`${parametersName}`]}
                                        type={parametersName}
                                        name={parametersName}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                    : <h3 className={style.value}>{values[`${parametersName}`]}</h3>
                                }
                            </div>
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