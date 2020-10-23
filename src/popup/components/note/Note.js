import React from "react";
import Box from "@material-ui/core/Box";
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import Button from "@material-ui/core/Button";
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import "./Note.css"
import { connect } from "react-redux";
import { createNote, setCurrentNote } from "../../../redux/modules/notes/actions";
import { SAVE_TO_STORAGE } from "../../../utils/constants";
import { sendToBackground } from "../../../utils/helpers";



class Note extends React.Component {

    componentDidMount = () => {
        // let title = document.querySelector('.addon')
        // console.log('TITLE', title.innerText)
    }

    handleSaveNote = () => {

        let note = {};
        const title = this.props.title;
        const content = this.props.currentNote;

        note[title] = {
            addon: title,
            version: '2.0.0',
            content: content
        }

        sendToBackground(SAVE_TO_STORAGE, note)
        this.props.setCurrentNote(null)
        this.props.createNote(false);
    }

    handleNoteChange = (event) => {
        this.props.setCurrentNote(event.target.value)
    }

    render() {
        return (
            <div className="note-div">
                <Box>
                    <h4>{this.props.title}</h4>
                    <TextareaAutosize
                        className='note-textarea'
                        aria-label="minimum height"
                        rowsMin={20}
                        onChange={this.handleNoteChange}
                        defaultValue={this.props.currentNote}
                    />
                </Box>
                <Button
                    color="secondary"
                    startIcon={<SaveOutlinedIcon />}
                    className="addNoteButton"
                    onClick={this.handleSaveNote}
                >
                    Save note
                </Button>
            </div>
        )
    }
}


const mapDispatchToProps = {
    createNote,
    setCurrentNote
}

const mapStateToProps = (state) => ({
    title: state.currentAddon.title,
    currentNote: state.notes.currentNote
})
export default connect(mapStateToProps, mapDispatchToProps)(Note);