import React, { useState } from 'react';
import style from './Send-Message-Form.module.css'

const InputMessage = (props) => {
    if (props.isSending) {

        return (
            <div
                ref={props.setRef}
                className={style.input}

                placeholder="Type a message"
                contentEditable
                suppressContentEditableWarning={true}

            >{''}</div>
        )
    }
    return (
        <div
            className={style.input}
            ref={props.setRef}
            placeholder="Type a message"
            contentEditable
            suppressContentEditableWarning={true}

        />
    )
}

const InputEdit = (props) => {

    const [value, setValue] = useState('props.value')
debugger
    return (
        <div
            className={style.input}
            ref={props.setRef}
            placeholder="Type a message"
            contentEditable
            suppressContentEditableWarning={true}
            onChange={(e) => {
                console.log(e.current)
                debugger
                setValue(e.current)
            }}
        >{value}</div>
    )

}
class SendMessageForm extends React.Component {
    //TODO: props->dialogId

    setRef = (ref) => {
        this.ref = ref;
    };
    saveInputValue = () => {
        const text = this.ref.innerText;
        // this.props.onChange(text);

    };
    submit() {
        const text = `${this.ref.innerText}`;
        // authUserId, isGroup, dialogId, body, isForwarded, ?isEditing from dialogs-reducer

        this.props.sendMessage(this.props.currentDialogId, text, false);
    };
//TODO removeEventListener
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
                    {this.props.isEditingInProgress 
                    ? <InputEdit {...this.props} setRef={this.setRef}/>
                    : <InputMessage {...this.props} setRef={this.setRef} />}

                </div>
                <div className={style.button__wrapper}>
                    <button className={style.button} type="submit"
                        onClick={() => { this.submit() }}
                    >
                        Submit
                    </button>
                </div>
            </div>


        )
    }
}

export default SendMessageForm