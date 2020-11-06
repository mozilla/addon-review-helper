import React from "react";
import { connect } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { setSidebarType, setSidebarTitle, setSidebarContent, loadData, loadNewPage } from "../../../redux/modules/sidebar/actions"
import { NOTE } from "../../../redux/modules/sidebar/types"
import { setNotes } from "../../../redux/modules/sidebar/actions";
import { SAVE_TO_STORAGE } from "../../../utils/constants";
import { sendToBackground } from "../../../utils/helpers";
import Pagination from '@material-ui/lab/Pagination';

class Notes extends React.Component {

    componentDidMount = () => {
        this.props.loadData()
    }

    handlePageChange = (event, value) => {
        console.log("VALUE", value)
        this.props.loadNewPage(value)
    }

    setList = () => {
        
        let items = Object.keys(this.props.notes).map((data, i) => {
            return (
                <div>
                    <ListItem
                        key={i}
                        onClick={this.handleListClick.bind(this, data, this.props.notes[data].content)}
                        style={{ cursor: "pointer" }}
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
                  
                </div>
            )

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
                  <Pagination count={this.props.totalPages} page={this.props.currentPage} onChange={this.handlePageChange} />
            </List>
        )
    }
}

const mapDispatchToProps = {
    setSidebarType,
    setSidebarTitle,
    setSidebarContent,
    setNotes,
    loadData,
    loadNewPage
}

const mapStateToProps = (state) => ({
    notes: state.sidebar.pageNotes,
    totalPages: state.sidebar.totalPages,
    currentPage: state.sidebar.currentPage
})

export default connect(mapStateToProps, mapDispatchToProps)(Notes);