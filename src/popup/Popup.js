import React, { Component } from 'react';
import "./Popup.css";

import { connect } from "react-redux";

import {MENU, NOTE, CATEGORIES} from "../redux/modules/popup/types";
import Menu from "./components/menu/Menu";
import Note from "./components/note/Note";
import Categories from "./components/categories/Categories";

class Popup extends Component {

    render() {
        switch (this.props.menuType) {
            case MENU:
                return <Menu />
            case NOTE:
                return <Note />
            case CATEGORIES:
                return <Categories />
            default:
                break;
        }
       
    }
}

const mapStateToProps = (state) => ({
    createNoteState: state.notes.createNote,
    menuType: state.popup.menuType
})


export default connect(mapStateToProps)(Popup);

