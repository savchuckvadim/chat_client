import React from "react"
import { connect } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { changeCurrentDialog, getMessages } from "../../../../../redux/dialogs-reducer"
import { searchDialog } from "../../../../../services/utils/dialog-utils"
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
        currentDialogId: state.dialogs.currentDialogId,
        dialogs: state.dialogs.dialogs,
        groupDialogs: state.dialogs.groupDialogs
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
        if(dialogId !== this.props.currentDialogId){
            debugger
            let dialog = searchDialog(dialogId, [this.props.dialogs, this.props.groupDialogs])
            if(dialog){
                debugger
                this.props.changeCurrentDialog(dialog, dialog.isGroup)
            }
            
        }
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
        getMessages,
        changeCurrentDialog
    })(withRouter(CurrentDialogContainer))
//     withRouter
// )