import React from "react";
import "./Note.css";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import Button from "@material-ui/core/Button";
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { setSidebarType, setSidebarContent } from "../../../redux/modules/sidebar/actions"
import { NOTES } from "../../../redux/modules/sidebar/types"
import { SAVE_TO_STORAGE } from "../../../utils/constants";
import { sendToBackground } from "../../../utils/helpers";
import { setNotes } from "../../../redux/modules/sidebar/actions";

class Note extends React.Component {

    handleBackButton = () => {
        this.props.setSidebarType(NOTES);
    }

    handleSaveButton = () => {
        const title = this.props.title;
        const content = this.props.content;
        let notes = this.props.notes ?? [];
        let index = _.findIndex(notes, function (note) { return note.addon == title });
        if (index > -1) {
            notes[index].title = title;
            notes[index].content = content;
            notes[index].date = Date.now();
        } else {
            notes.push({
                addon: title,
                content: content,
                date: Date.now()
            })
        }
        sendToBackground(SAVE_TO_STORAGE, { 'notes': notes })
        this.props.setNotes(notes);
        this.props.setSidebarType(NOTES);
    }

    handleContentChange = (event) => {
        this.props.setSidebarContent(event.target.value);
    }

    render() {
        return (
            <div>
                <Box>
                    <h4>{this.props.title}</h4>
                    <TextareaAutosize
                        className='note-textarea'
                        aria-label="minimum height"
                        rowsMin={20}
                        onChange={this.handleContentChange}
                        defaultValue={this.props.content}
                    />
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={this.handleBackButton}
                        style={{ margin: "0 15px" }}
                    >Back</Button>
                    <Button color="secondary"
                        startIcon={<SaveOutlinedIcon />}
                        onClick={this.handleSaveButton}
                        className="secondary-button"
                    >Save Note
                    </Button>


                </Box>
            </div>
        )
    }
}

const mapDispatchToProps = {
    setSidebarType,
    setSidebarContent,
    setNotes
};

const mapStateToProps = (state) => ({
    title: state.sidebar.title,
    content: state.sidebar.content,
    notes: state.sidebar.notes
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);