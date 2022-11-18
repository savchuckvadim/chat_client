import React, { useEffect, useState } from 'react';
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

const InputEditMessage = (props) => {

    const [value, setValue] = useState(props.editingBody)

    useEffect(() => {
        
        if (props.isSended && !props.editingBody) {
            
            setValue(null)
            props.setIsSeneded(false)
        }
    }, [props.isSended])
    useEffect(() => {
        if (props.isEditingInProgress) {
            
            setValue(props.editingBody)

        }
    }, [props.isEditingInProgress])

    return (
        <div
            className={style.input}
            ref={props.setRef}
            placeholder="Type a message"
            contentEditable
            suppressContentEditableWarning={true}
            onChange={(e) => {
                setValue(e.current)
            }}
        >{value}</div>
    )

}
class SendMessageForm extends React.Component {
    //TODO: props->dialogId
    constructor(props) {
        super(props);
        this.state = { isSended: false };
    }
    setIsSeneded = (bool) => {
        this.setState({
            isSended: bool
        });
    }

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
        !this.props.isEditingInProgress
            ? this.props.sendMessage(this.props.currentDialogId, text, false)
            : this.props.sendEditMessage(this.props.editingMessageId, text)
    };

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
                        ? <InputEditMessage {...this.props} setRef={this.setRef}
                            isSended={this.state.isSended}
                            setIsSeneded={this.setIsSeneded}
                        />
                        : <InputMessage {...this.props} setRef={this.setRef} />}

                </div>
                <div className={style.button__wrapper}>
                    <button className={style.button} type="submit"
                        onClick={() => {
                            this.setState({
                                isSended: true
                            });
                            this.submit()
                        }}
                    >
                        =>
                    </button>
                </div>
            </div>


        )
    }
}

export default SendMessageForm