import React from "react";
import { connect } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { setSidebarType, setSidebarTitle, setSidebarContent, setCurrentPage } from "../../../redux/modules/sidebar/actions"
import { NOTE, DATE_ASC, DATE_DESC, TITLE_ASC, TITLE_DESC } from "../../../redux/modules/sidebar/types"
import { setNotes } from "../../../redux/modules/sidebar/actions";
import { SAVE_TO_STORAGE } from "../../../utils/constants";
import { sendToBackground } from "../../../utils/helpers";
import Pagination from '@material-ui/lab/Pagination';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import _, { orderBy } from "lodash";
import { loadPage, loadItems } from "../../../utils/helpers";


class Notes extends React.Component {

    constructor() {
        super();
        const perPage = 2;
        this.state = {
            pageNotes: [],
            perPage,
            currentCount: perPage,
            totalPages: 1,
            orderBy: DATE_DESC,
            searchBy: null,
        }
    }

    loadFirstPage = (notes) => {
        let totalNotes = notes.length;
        let perPage = this.state.perPage;
        let pageNotes = loadItems(notes, 0, perPage);
        let totalPages = Math.ceil(totalNotes / perPage);

        this.setState({
            pageNotes,
            totalPages,
            currentCount: perPage,
        })
    }

    componentDidMount = () => {
        let results = loadPage(this.props.notes, this.props.currentPage, this.state.perPage);
        let totalPages = Math.ceil(this.props.notes.length / this.state.perPage);

        this.setState({
            pageNotes: results.pageItems,
            currentCount: results.currentCount,
            totalPages
        })
    }

    handlePageChange = (event, page) => {
        let notes = this.orderNotes(this.state.orderBy);
        if (this.state.searchBy) {
            notes = this.searchNotes(notes, this.state.searchBy)
        }
        let results = loadPage(
            notes,
            page,
            this.state.perPage
        )

        this.props.setCurrentPage(results.currentPage)
        this.setState({
            pageNotes: results.pageItems,
            currentCount: results.currentCount
        })
    }

    setList = () => {
        let items = Object.keys(this.state.pageNotes).map((data, i) => {
            return (
                <div key={data + 1}>
                    <ListItem
                        key={data}
                        onClick={this.handleListClick.bind(this, this.state.pageNotes[data].addon, this.state.pageNotes[data].content)}
                        style={{ cursor: "pointer" }}
                    >
                        <ListItemText
                            primary={this.state.pageNotes[data].addon}
                            secondary={this.state.pageNotes[data].content.substring(0, 100)}
                        ></ListItemText>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={this.handleDeleteButton.bind(this, this.state.pageNotes[data].addon)}>
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

    handleDeleteButton = (addon) => {
        let notes = this.props.notes;
        let addonIndex;
        Object.keys(notes).some((data, index) => {
            if (notes[index].addon === addon) {
                addonIndex = index;
                return true;
            }
        })
        notes.splice(addonIndex, 1);
        sendToBackground(SAVE_TO_STORAGE, { 'notes': _.isEmpty(notes) ? [] : notes })
        this.props.setNotes(_.isEmpty(notes) ? [] : notes);

        notes = this.orderNotes(this.state.orderBy);
        if (this.state.searchBy) {
            notes = this.searchNotes(notes, this.state.searchBy);
        }
        let totalPages = Math.ceil(notes.length / this.state.perPage);
        let currentPage = this.props.currentPage;
        if (totalPages < this.state.totalPages) {
            currentPage--;
        }

        let results = loadPage(
            notes,
            currentPage,
            this.state.perPage
        )
        this.props.setCurrentPage(currentPage)
        this.setState({
            pageNotes: results.pageItems,
            currentCount: results.currentCount,
            totalPages
        })
    }

    orderNotes = (orderBy) => {
        let notes = this.props.notes;
        switch (orderBy) {
            case DATE_ASC:
                notes = _.orderBy(notes, [notes => new Date(notes.date)], "asc");
                break;
            case DATE_DESC:
                notes = _.orderBy(notes, [notes => new Date(notes.date)], "desc");
                break;
            case TITLE_ASC:
                notes = _.orderBy(notes, [notes => notes.addon.toLowerCase()], "asc");
                break;
            case TITLE_DESC:
                notes = _.orderBy(notes, [notes => notes.addon.toLowerCase()], "desc");
                break;
            default:
            //nothing
        }

        this.setState({
            orderBy
        })

        return notes;
    }

    handleOrderByChange = (event) => {
        let notes = this.orderNotes(event.target.value)
        if (this.state.searchBy) {
            notes = this.searchNotes(notes, this.state.searchBy)
        }
        this.loadFirstPage(notes);
    }

    //TODO: keep searchBy in mind when changing page and ordering
    //TODO: searchBy should persist
    handleSearchByChange = (event) => {
        let notes = this.orderNotes(this.state.orderBy);
        if (event.target.value.length >= 1) {
            notes = this.searchNotes(notes, event.target.value);
            this.setState({
                searchBy: event.target.value
            })
        } else if (event.target.value.length === 0) {
            this.setState({
                searchBy: null
            })
        }
        this.loadFirstPage(notes);
    }

    searchNotes = (notes, searchBy) => {
        searchBy = searchBy.toLowerCase();
        let searched = _.filter(notes, function (note) {
            return note.addon.toLowerCase().includes(searchBy) || note.content.toLowerCase().includes(searchBy)
        })
        return searched;
    }

    render() {
        return (
            <List>
                <FormControl variant="outlined" style={{ margin: "0 15px" }}>
                    <InputLabel id="demo-simple-select-outlined-label">OrderBy</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.orderBy}
                        onChange={this.handleOrderByChange}
                        label="Age"
                    >
                        <MenuItem value={DATE_ASC}>Date Asc</MenuItem>
                        <MenuItem value={DATE_DESC}>Date Desc</MenuItem>
                        <MenuItem value={TITLE_ASC}>Title Asc</MenuItem>
                        <MenuItem value={TITLE_DESC}>Title Desc</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    onChange={this.handleSearchByChange}
                />
                {
                    this.setList()
                }
                <Pagination count={this.state.totalPages} page={this.props.currentPage} onChange={this.handlePageChange} />
            </List>
        )
    }
}

const mapDispatchToProps = {
    setSidebarType,
    setSidebarTitle,
    setSidebarContent,
    setNotes,
    setCurrentPage
}

const mapStateToProps = (state) => ({
    notes: state.sidebar.notes,
    currentPage: state.sidebar.currentPage
})

export default connect(mapStateToProps, mapDispatchToProps)(Notes);