import React from 'react';
import { connect } from 'react-redux';

import {TitleContainer, NoteContainer, TextareaContainer, ButtonSave} from './Note.styled';

import Box from '@material-ui/core/Box';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { createNote, setCurrentNote } from '../../../redux/modules/notes/actions';
import { setNotes, setTotalNotes } from '../../../redux/modules/sidebar/actions';
import { MENU } from '../../../redux/modules/popup/types';
import { setMenuType } from '../../../redux/modules/popup/actions';
import { SAVE_TO_STORAGE } from '../../../utils/constants';
import { sendToBackground } from '../../../utils/helpers';

const Note =({title, currentNote, version, notes, setTotalNotes, setNotes, setMenuType, setCurrentNote }) => {
    const handleSaveNote = () => {
        const notesAdded = notes ?? [];
        console.log(notesAdded);
        let index = notesAdded.findIndex(note => note.addon === title);
        if (index > -1) {
            notesAdded[index].title = title;
            notesAdded[index].version = version;
            notesAdded[index].content = currentNote;
            notesAdded[index].date = Date.now();
        } else {
            notesAdded.push({
                addon: title,
                version: version,
                content: currentNote,
                date: Date.now()
            })
        }
        sendToBackground(SAVE_TO_STORAGE, { 'notes': notesAdded })
        setTotalNotes(Object.keys(notesAdded).length)
        setNotes(notesAdded);
        setMenuType(MENU);
    }

    const handleNoteChange = event => setCurrentNote(event.target.value);

    const textareaDefaultValue = currentNote && currentNote.includes(version)? currentNote:  version + '\n';

    return (
        <NoteContainer>
            <Box>
                <TitleContainer>{title}</TitleContainer>
                <TextareaContainer
                    aria-label='minimum height'
                    rowsMin={20}
                    onChange={handleNoteChange}
                    defaultValue={textareaDefaultValue}
                />
            </Box>
            <ButtonSave
                color='secondary'
                startIcon={<SaveOutlinedIcon />}
                onClick={handleSaveNote}
            >
                Save note
            </ButtonSave>
        </NoteContainer>
    )
}

const mapDispatchToProps = {
    createNote,
    setCurrentNote,
    setNotes,
    setTotalNotes,
    setMenuType
}

const mapStateToProps = (state) => ({
    title: state.currentAddon.title,
    currentNote: state.notes.currentNote,
    version: state.currentAddon.version,
    notes: state.sidebar.notes,
})
export default connect(mapStateToProps, mapDispatchToProps)(Note);
