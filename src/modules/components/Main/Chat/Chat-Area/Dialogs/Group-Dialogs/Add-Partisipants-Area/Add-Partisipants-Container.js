import { connect } from "react-redux"
import { setGroupDialogsName } from "../../../../../../../redux/dialogs-reducer"
import AddPartisipantsArea from "./Add-Partisipants-Area"

const mapStateToProps = (state) => {
    return {
        newGroupDialogsName: state.dialogs.newGroupDialogsName
    }
}

const AddPartisipantsContainer = connect(mapStateToProps, {
    setGroupDialogsName
})(AddPartisipantsArea)

export default AddPartisipantsContainer