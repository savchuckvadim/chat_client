import { connect } from "react-redux"
import SoundStatus from "./SoundStatus"



const mapState = (state) => {
    return{
        currentDialog:state.currentDialog
    }

}

export default connect(mapState, {

})(SoundStatus)