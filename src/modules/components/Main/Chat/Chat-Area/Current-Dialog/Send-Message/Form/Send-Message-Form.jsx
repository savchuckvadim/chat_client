import { Field, Formik } from 'formik';
import InputMessage from './Input/Input-Message';
import style from './Send-Message-Form.module.css'

const SendMessageForm = () => {
    return (
     
           
            <Formik
                initialValues={{ message: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } 
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                   //TODO: send messge
                    
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
                        
                        {/* <textarea
                            type="text"
                            name="message"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.message}
                            className={style.input}
                        /> */}
                        <Field
                        className={style.field}
                        name="message"
                        component={InputMessage}
                        />
                        {errors.message && touched.message && errors.message}
                        
                       
                        <button className={style.button} type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        
    )
}

export default SendMessageForm