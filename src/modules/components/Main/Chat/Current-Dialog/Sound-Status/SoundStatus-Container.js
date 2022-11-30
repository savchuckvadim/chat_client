import { connect } from "react-redux"
import { changeDialogSound } from "../../../../../redux/dialogs-reducer"
import SoundStatus from "./SoundStatus"



const mapState = (state) => {
    return {
        currentDialog: state.dialogs.currentDialog
    }

}

export default connect(mapState, {
    changeDialogSound
})(SoundStatus)