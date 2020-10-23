import React, { Component } from 'react';
import "./Popup.css";

import { connect } from "react-redux";

import Menu from "./components/menu/Menu";
import Note from "./components/note/Note";

class Popup extends Component {

    render() {
        return (
            <div className="popup">
                {
                    !this.props.createNoteState ?
                        <Menu /> : <Note />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    createNoteState: state.notes.createNote
})


export default connect(mapStateToProps)(Popup);

