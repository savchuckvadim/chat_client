import { Formik } from "formik"
import { authApi } from "../../../services/api/auth-api"
import style from './Registration.module.css'

const Registration = () => {
    // authApi.logout()
    return (
        <div>
            <h1>Registration</h1>
            <Formik
                initialValues={{ nickname: '', email: '', password: '', passwordRepeat: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    //     setSubmitting(false);
                    // }, 400);
                    authApi.registration(values.nickname, values.email, values.password, values.passwordRepeat)
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form className={style.form} onSubmit={handleSubmit}>
                        <p>Nickname</p>
                        <input
                            type="nickname"
                            name="nickname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nickname}
                        />
                        {errors.nickname && touched.nickname && errors.nickname}
                        <p>Email</p>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && errors.email}
                        <p>Password</p>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                        <p>Password Repeat</p>
                        <input
                            type="password"
                            name="passwordRepeat"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.passwordRepeat}
                        />
                        {errors.passwordRepeat && touched.passwordRepeat && errors.passwordRepeat}
                        <button className={style.button} type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Registration