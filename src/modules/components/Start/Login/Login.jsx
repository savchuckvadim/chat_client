import { ErrorMessage, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import style from '../Registration/Registration.module.css'

const Login = (props) => {

    return (
        <div className={style.form__wrapper}>
            <div className={style.container}>

                <h1 className={style.page__title}>Login</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={async (values) => {


                        try {
                            await props.login(values.email, values.password)
                        } catch (e) {

                            alert('Логин или пароль не верны!')

                        }

                    }}

                >
                    {({
                        values,
                        errors,
                        status,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,


                    }) => {

                        return <form className={style.form} onSubmit={handleSubmit}>

                            <p className={style.title}>Email</p>
                            <input
                                className={style.input}
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <ErrorMessage name="email" />
                            {/* <p>{errors.email && touched.email && errors.email}</p>  */}
                            <p className={style.title}>Password</p>
                            <input
                                className={style.input}
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {errors.password && touched.password && errors.password}

                            <button className={style.button} type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                    }}
                </Formik>
            </div>

        </div >
    )
}

export default Login