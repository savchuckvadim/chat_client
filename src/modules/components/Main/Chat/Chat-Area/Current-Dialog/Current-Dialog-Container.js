import React from "react"
import { connect } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { getMessages } from "../../../../../redux/dialogs-reducer"
import CurrentDialog from "./Current-Dialog"


const withRouter = (WrappedComponent) => (props) => {
    const params = useParams()

    return (
        <WrappedComponent
            {...props}
            params={params} />
    )
}

const mapStateToProps = (state) => {
    return {
        // currentDialog: state.dialogs.currentDialog,
        currentDialogId: state.dialogs.currentDialogId
    }
}

class CurrentDialogContainer extends React.Component {
    dialogId;
    getDialogId = () => {

        if (this.props.params) {
            if (this.props.params.dialogId !== undefined) {
                return Number(this.props.params.dialogId)
            }
            // else {
            //     if (this.props.auth) {
            //         return Number(this.props.auth.id)
            //     }
            // }
        }
        //TODO :
        return undefined
    }


    componentDidMount() {
        // window.scrollTo(0, 0)
        let dialogId = this.getDialogId()
        this.dialogId = dialogId
        // console.log(dialogId)
        // this.props.getMessages(dialogId)
        //TODO: from reducer get currentsDialogMessages
        // this.getProfileData(userId)


    }
    componentDidUpdate() {

        let dialogId = this.getDialogId()
        // this.dialogId = dialogId
        // console.log(dialogId)
        // this.getProfileData(userId)

    }
    render() {

        return (
            <CurrentDialog  {...this.props} />
        )
    }
}


export default
    // compose(
    connect(mapStateToProps, {
        getMessages
    })(withRouter(CurrentDialogContainer))
//     withRouter
// )