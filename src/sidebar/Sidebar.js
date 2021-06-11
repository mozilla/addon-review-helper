import React from "react";
import "./Sidebar.css";
import { connect } from "react-redux";
import Notes from "./components/notes/Notes";
import Note from "./components/note/Note"
import {
    NOTES,
    NOTE,
    CATEGORY_ADDONS,
    NEW_REJECTIONS,
    REJECTION
} from "../redux/modules/sidebar/types"
import CategoryAddons from "./components/categoryAddons/CategoryAddons";
import NewRejections from "./components/newRejections/NewRejections";
import Rejection from "./components/rejection/Rejection";

class Sidebar extends React.Component {
    render() {
        switch (this.props.type) {
            case NOTES:
                return <Notes />
            case NOTE:
                return <Note />
            case CATEGORY_ADDONS:
                return <CategoryAddons />
            case NEW_REJECTIONS:
                return <NewRejections />
            case REJECTION:
                return <Rejection />
            default:
                break;
        }
    }
}

const mapStateToProps = (state) => ({
    type: state.sidebar.type
})

export default connect(mapStateToProps)(Sidebar);