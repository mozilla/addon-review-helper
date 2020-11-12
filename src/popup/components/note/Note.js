import React from "react";
import Box from "@material-ui/core/Box";
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import Button from "@material-ui/core/Button";
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import "./Note.css"
import { connect } from "react-redux";
import { createNote, setCurrentNote } from "../../../redux/modules/notes/actions";
import { setNotes, setTotalNotes } from "../../../redux/modules/sidebar/actions";
import { SAVE_TO_STORAGE } from "../../../utils/constants";
import { sendToBackground } from "../../../utils/helpers";
import _ from "lodash";



class Note extends React.Component {

    componentDidMount = () => {
        //console.log('NOTES', this.props.notes)
    }

    handleSaveNote = () => {

        const title = this.props.title;
        const content = this.props.currentNote;
        const version = this.props.version;
        let notes = this.props.notes ?? [];
        let index = _.findIndex(notes, function (note) { return note.addon == title });
        if (index > -1) {
            notes[index].title = title;
            notes[index].version = version;
            notes[index].content = content;
            notes[index].date = Date.now();
        } else {
            notes.push({
                addon: title,
                version: version,
                content: content,
                date: Date.now()
            })
        }
        sendToBackground(SAVE_TO_STORAGE, { 'notes': notes })
        this.props.setTotalNotes(Object.keys(notes).length)
        this.props.setNotes(notes);
        this.props.createNote(false);
    }

    handleNoteChange = (event) => {
        this.props.setCurrentNote(event.target.value)
    }

    textareaDefaultValue = () => {
        if (this.props.currentNote) {
            if (this.props.currentNote.includes(this.props.version))
                return this.props.currentNote;
            else
                return this.props.version + '\n' + this.props.currentNote;
        } else {
            return this.props.version + '\n';
        }

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
                        defaultValue={this.textareaDefaultValue()}
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
    setCurrentNote,
    setNotes,
    setTotalNotes
}

const mapStateToProps = (state) => ({
    title: state.currentAddon.title,
    currentNote: state.notes.currentNote,
    version: state.currentAddon.version,
    notes: state.sidebar.notes,
})
export default connect(mapStateToProps, mapDispatchToProps)(Note);