import { Formik } from "formik";
import style from './Search-Form.module.css'

const SearchForm = (props) => {

    const onSearchChange = (e) => {
       
        if (e.target.value) {
            props.findUser(e.target.value)
        } else {
            props.getUsers(1, 10)
        }


    }

    return (
        // <div className={style.container}>

        <Formik
            initialValues={{ search: '' }}


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
                        placeholder="search..."
                        onChange={(e) => {
                            handleChange(e)
                            onSearchChange(e)
                        }}
                        onBlur={handleBlur}
                        value={values.search}
                    />
                    {/* {errors.search && touched.search && errors.search} */}



                </form>
            )}
        </Formik>
        // </div>
    )
}

export default SearchForm