import { Formik } from "formik";
import style from './Search-Form.module.css'

const SearchForm = (props) => {

    
    return (
        // <div className={style.container}>
       
            <Formik
                initialValues={{ search: ''}}
            
       
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
                    <form className={style.form} >

                        <input
                            className={style.input}
                            type="search"
                            name="search"
                            onChange={(e) => {
                                handleChange(e);
                                console.log (e.target.value)
                                // console.log (values.search)
                            }}
                            onBlur={handleBlur}
                            value={values.search}
                        />
                        {errors.search && touched.search && errors.search}



                    </form>
                )}
            </Formik>
        // </div>
    )
}

export default SearchForm