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
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
import SlideshowOutlinedIcon from '@material-ui/icons/SlideshowOutlined';
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

    handleOpenPage = (event, newValue) => {
        switch (newValue) {
            case "bugs":
                browser.tabs.create({
                    url:"https://docs.google.com/document/d/15URvcePcJWm1e2_ybzUnjOi63Ks2WWQ9YJHGZkETG6Y/edit?usp=sharing"
                  });
                break;
            case "guide":
                browser.tabs.create({
                    url:"https://drive.google.com/file/d/1wJpEzB2X9IR2UXSBhcS8jMLwnsc2hShf/view?usp=sharing"
                  });
                break;
            default:
            //nothing
        }
        console.log("new value", newValue)
    }

    render() {

        return (
            <div>
                <Box>
                    <BottomNavigation onChange={this.handleOpenPage}>
                        <BottomNavigationAction label="Guide" value="guide" icon={<SlideshowOutlinedIcon />} />
                        <BottomNavigationAction label="Bugs" value="bugs" icon={<BugReportOutlinedIcon />} />
                    </BottomNavigation>
                    <MenuList>
                        {/* <MenuItem onClick={this.openToDoList} disabled={true}><DoneAllIcon />  To-do List</MenuItem> */}
                        <MenuItem onClick={this.openCategories}><ListIcon /> Categories</MenuItem>
                        {/* <MenuItem onClick={this.openHistoryReview} disabled={true}><QueryBuilderIcon /> History Review</MenuItem> */}
                        <MenuItem onClick={this.openNotes}><NoteIcon /> Notes</MenuItem>
                        {/* <MenuItem onClick={this.openHiddenAddons} disabled={true}><VisibilityOffOutlinedIcon /> Hidden Add-ons</MenuItem> */}
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