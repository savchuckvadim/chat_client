import { Field, Formik } from 'formik';
import React from 'react';
import InputMessage from './Input/Input-Message';
import style from './Send-Message-Form.module.css'



// const SendMessageForm = () => {

//     return (
//         <Formik
//             initialValues={{ message: '' }}
//             // validate={values => {
//             //     const errors = {};
//             //     if (!values.message) {
//             //         errors.message = 'Required';
//             //     }
//             //     return errors;
//             // }}
//             onSubmit={(values, { setSubmitting }) => {

//                 console.log(values)

//             }}
//         >
//             {({
//                 values,
//                 errors,
//                 touched,
//                 handleChange,
//                 handleBlur,
//                 handleSubmit,
//                 isSubmitting,
//                 /* and other goodies */
//             }) => (
//                 <form className={style.form} onSubmit={handleSubmit}>

//                     {/* <textarea
//                             type="text"
//                             name="message"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.message}
//                             className={style.input}
//                         /> */}
//                     <Field
//                         className={style.field}
//                         name="message"
//                         component={InputMessage}
//                     />
//                     {/* {errors.message && touched.message && errors.message} */}

//                     <div className={style.button__wrapper}>
//                         <button className={style.button} type="submit" disabled={isSubmitting}>
//                             Submit
//                         </button>
//                     </div>

//                 </form>
//             )}
//         </Formik>

//     )
// }

// export default SendMessageForm

class SendMessageForm extends React.Component {

    setRef = (ref) => {
        this.ref = ref;
    };
    saveInputValue = () => {
        const text = this.ref.innerText;
        console.log(text)
        // this.props.onChange(text);
        
    };
    updateCaretPosition = () => {
        const { node, cursorPosition } = this.state;
      
        const selection = window.getSelection();
        const newNode = selection.anchorNode;
        const newCursorPosition = selection.anchorOffset;
      
        if ( node === newNode && cursorPosition === newCursorPosition) {
          return;
        }
      
        this.setState({ node, cursorPosition });
      }
    componentDidMount() {
        this.ref.addEventListener('input', this.saveInputValue);
    }
    componentWillUnmount() {
        this.ref.removeEventListener('input', this.saveInputValue);
    }

    render() {
        return (
            <div className={style.form}>
                <div className={style.field}>
                    <div
                        className={style.input}
                        ref={this.setRef}
                        placeholder="Type a message"
                        contentEditable
                        suppressContentEditableWarning={true}
                      
                    />

                </div>
                <div className={style.button__wrapper}>
                    <button className={style.button} type="submit">
                        Submit
                    </button>
                </div>
            </div>


        )
    }
}

export default SendMessageForm