import React from "react";
import { connect } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { setSidebarType, setSidebarTitle, setSidebarContent, loadData, loadNewPage, setOrderBy } from "../../../redux/modules/sidebar/actions"
import { NOTE, DATE_ASC, DATE_DESC, TITLE_ASC, TITLE_DESC } from "../../../redux/modules/sidebar/types"
import { setNotes } from "../../../redux/modules/sidebar/actions";
import { SAVE_TO_STORAGE } from "../../../utils/constants";
import { sendToBackground } from "../../../utils/helpers";
import Pagination from '@material-ui/lab/Pagination';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import _ from "lodash";

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
                        onClick={this.handleListClick.bind(this, this.props.notes[data].addon, this.props.notes[data].content)}
                        style={{ cursor: "pointer" }}
                    >
                        <ListItemText
                            primary={this.props.notes[data].addon}
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

    handleDeleteButton = (index) => {
        let notes = this.props.notes;
        delete notes[index];
        console.log("NOTES",)
        console.log("IS EMPTY", _.isEmpty(notes) )
        sendToBackground(SAVE_TO_STORAGE, { 'notes': _.isEmpty(notes) ? [] : notes })
        this.props.setNotes(_.isEmpty(notes) ? [] : notes);
        this.props.loadData();
    }

    handleOrderByChange = (event) => {
        this.props.setOrderBy(event.target.value);
    }

    render() {
        return (
            <List>
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">OrderBy</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.props.orderBy}
                        onChange={this.handleOrderByChange}
                        label="Age"
                    >
                        <MenuItem value={DATE_ASC}>Date Asc</MenuItem>
                        <MenuItem value={DATE_DESC}>Date Desc</MenuItem>
                        <MenuItem value={TITLE_ASC}>Title Asc</MenuItem>
                        <MenuItem value={TITLE_DESC}>Title Desc</MenuItem>
                    </Select>
                </FormControl>
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
    loadNewPage,
    setOrderBy
}

const mapStateToProps = (state) => ({
    notes: state.sidebar.pageNotes,
    totalPages: state.sidebar.totalPages,
    currentPage: state.sidebar.currentPage,
    orderBy: state.sidebar.orderBy
})

export default connect(mapStateToProps, mapDispatchToProps)(Notes);