import React from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { changeCurrentDialog, getMessages } from "../../../../../redux/dialogs-reducer"
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