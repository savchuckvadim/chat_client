import { Formik } from "formik";
import style from '../Registration/Registration.module.css'

const Login = (props) => {

    return (
        <div className={style.form__wrapper}>
        <div className={style.container}>
            
            <h1 className={style.page__title}>Login</h1>
            <Formik
                initialValues={{ email: '', password: ''}}
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
                    props.login(values.email, values.password)
                    
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
                   
                }) => (
                    <form className={style.form} onSubmit={handleSubmit}>
                        
                         <p className={style.title}>Email</p>
                        <input
                        className={style.input}
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && errors.email}
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
                )}
            </Formik>
            </div>
            
        </div>
    )
}

export default Login