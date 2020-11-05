import React from "react";
import { connect } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { setSidebarType, setSidebarTitle, setSidebarContent } from "../../../redux/modules/sidebar/actions"
import { NOTE } from "../../../redux/modules/sidebar/types"
import { setNotes } from "../../../redux/modules/notes/actions";
import { SAVE_TO_STORAGE } from "../../../utils/constants";
import { sendToBackground } from "../../../utils/helpers";

class Notes extends React.Component {

    setList = () => {

        let items = Object.keys(this.props.notes).map((data, i) => {
            return <ListItem
                key={i}
                onClick={this.handleListClick.bind(this, data, this.props.notes[data].content)}
                style={{cursor:"pointer"}}
                >
                <ListItemText
                    primary={data}
                    secondary={this.props.notes[data].content.substring(0, 100)}
                ></ListItemText>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={this.handleDeleteButton.bind(this, data)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
            </ListItem>
        })

        return items;
    }

    handleListClick = (title, content) => {
        this.props.setSidebarTitle(title);
        this.props.setSidebarContent(content);
        this.props.setSidebarType(NOTE);
    }

    handleDeleteButton = (title) => {
        let notes = this.props.notes;
        delete notes[title];
        sendToBackground(SAVE_TO_STORAGE, { 'notes': notes })
        this.props.setNotes(notes);
    }

    render() {
        return (
            <List>
                {
                    this.setList()
                }
            </List>
        )
    }
}

const mapDispatchToProps = {
    setSidebarType,
    setSidebarTitle,
    setSidebarContent,
    setNotes
}

const mapStateToProps = (state) => ({
    notes: state.notes.notes
})

export default connect(mapStateToProps, mapDispatchToProps)(Notes);