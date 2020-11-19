import React from "react";
import "./Menu.css";
import Box from "@material-ui/core/Box";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ListIcon from '@material-ui/icons/List';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import NoteIcon from '@material-ui/icons/Note';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import { connect } from "react-redux";
import { createNote } from "../../../redux/modules/notes/actions";
import { setMenuType } from "../../../redux/modules/popup/actions";
import { NOTE, CATEGORIES } from "../../../redux/modules/popup/types";
import { setSidebarType } from "../../../redux/modules/sidebar/actions";
import { NOTES } from "../../../redux/modules/sidebar/types";


class Menu extends React.Component {

    openToDoList() {
        // openNewTab("https://example.org")
    }

    openCategories = () => {
        this.props.setMenuType(CATEGORIES)
    }

    openHistoryReview() {
        console.log('History review')
    }

    openNotes = () => {
        this.props.setSidebarType(NOTES);
        browser.sidebarAction.open()
    }

    openHiddenAddons() {
        console.log('Hidden add-ons')
    }


    handleCreateNote = () => {
        this.props.setMenuType(NOTE);
    }

    render() {

        return (
            <div>
                <Box>
                    <MenuList>
                        <MenuItem onClick={this.openToDoList}><DoneAllIcon />  To-do List</MenuItem>
                        <MenuItem onClick={this.openCategories}><ListIcon /> Categories</MenuItem>
                        <MenuItem onClick={this.openHistoryReview}><QueryBuilderIcon /> History Review</MenuItem>
                        <MenuItem onClick={this.openNotes}><NoteIcon /> Notes</MenuItem>
                        <MenuItem onClick={this.openHiddenAddons}><VisibilityOffOutlinedIcon /> Hidden Add-ons</MenuItem>
                    </MenuList>
                </Box>
                <Button
                    color="secondary"
                    startIcon={<AddIcon />}
                    className="addNoteButton"
                    onClick={this.handleCreateNote}
                    disabled={!this.props.canCreateNote}
                >
                    Add note
                </Button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    createNote,
    setSidebarType,
    setMenuType
}

const mapStateToProps = (state) => ({
    createNoteState: state.notes.createNote,
    canCreateNote: state.notes.canCreateNote
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);