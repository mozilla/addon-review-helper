import React from 'react';

import {TitleContainer, ButtonSave, ButtonBack, TextareaContainer} from './Note.styled';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { setSidebarType, setSidebarContent } from '../../../redux/modules/sidebar/actions';
import { NOTES } from '../../../redux/modules/sidebar/types';
import { SAVE_TO_STORAGE } from '../../../utils/constants';
import { sendToBackground } from '../../../utils/helpers';
import { setNotes } from '../../../redux/modules/sidebar/actions';

const Note = ({title, content, notes, setNotes, setSidebarType, setSidebarContent}) => {
    console.log('addontitle', title);
    const handleBackButton = () => setSidebarType(NOTES);

    const handleSaveButton = () => {
        let index = _.findIndex(notes ?? [], note => note.addon == title);
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
        sendToBackground(SAVE_TO_STORAGE, { notes })
        setNotes(notes);
        setSidebarType(NOTES);
    }

    const handleContentChange = event => {
        setSidebarContent(event.target.value);
    }
   
    return (
        <Box>
            <TitleContainer>{title}</TitleContainer>
            <TextareaContainer
                aria-label="minimum height"
                rowsMin={20}
                onChange={handleContentChange}
                defaultValue={content}
            />
            <ButtonBack
                startIcon={<ArrowBackIcon />}
                onClick={handleBackButton}
            >Back</ButtonBack>
            <ButtonSave color="secondary"
                startIcon={<SaveOutlinedIcon />}
                onClick={handleSaveButton}
            >Save Note
            </ButtonSave>
        </Box>
    )
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