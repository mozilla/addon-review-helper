import React from "react";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./Categories.css";
import Grid from '@material-ui/core/Grid';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { setCurrentCategory, setCategories, setEditIndex, setTotalCategories, loadCategories, loadNewPageC, setSelectedCategories } from "../../../redux/modules/categories/actions"
import { setMenuType } from "../../../redux/modules/popup/actions"
import { MENU } from "../../../redux/modules/popup/types"
import { SAVE_TO_STORAGE } from "../../../utils/constants";
import { sendToBackground } from "../../../utils/helpers";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import _ from "lodash";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Pagination from '@material-ui/lab/Pagination';
import CurrentAddon from "./CurrentAddon";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { setSidebarType, setSelectedCategory } from "../../../redux/modules/sidebar/actions";
import { CATEGORY_ADDONS } from "../../../redux/modules/sidebar/types";

class Categories extends React.Component {

    componentDidMount = () => {
        this.props.loadCategories()
        if (this.props.withAddons) {
            let selectedCategories = [];
            Object.keys(this.props.withAddons).forEach(category => {
                if (this.props.withAddons[category].indexOf(this.props.title) > -1)
                    selectedCategories.push(category)
            })
            this.props.setSelectedCategories(selectedCategories)
        }

    }

    handleCategoryChange = (event) => {
        this.props.setCurrentCategory(event.target.value)
    }

    handleSaveCategory = () => {
        if (this.props.currentCategory.length > 0) {
            var categories = this.props.categories ?? [];

            if (_.isNumber(this.props.editIndex)) {
                categories[this.props.editIndex] = this.props.currentCategory;
            } else {
                categories.push(this.props.currentCategory);
            }

            categories = categories.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
            this.props.setCategories(categories);
            this.props.setTotalCategories(categories.length);
            sendToBackground(SAVE_TO_STORAGE, { 'categories': JSON.stringify(categories) })
            this.props.setCurrentCategory('')
            this.props.loadCategories();
        }
    }

    handleDelete = (index) => {
        var categories = this.props.categories;
        categories.splice(index, 1)
        var newCategories = _.isEmpty(categories) ? [] : categories;
        sendToBackground(SAVE_TO_STORAGE, { 'categories': newCategories })
        this.props.setCategories(newCategories);
    }

    handleEdit = (index) => {
        var category = this.props.categories[index];
        this.props.setCurrentCategory(category);
        this.props.setEditIndex(index);
    }

    handleBackButton = () => {
        this.props.setMenuType(MENU)
    }

    handlePageChange = (event, value) => {
        this.props.loadNewPageC(value)
    }

    handleKeyPressed = (e) => {
        if (e.keyCode === 13) {
            this.handleSaveCategory();
        }
    }

    handleList = (index) => {
        this.props.setSelectedCategory(this.props.categories[index])
        this.props.setSidebarType(CATEGORY_ADDONS);
        browser.sidebarAction.open()
    }

    render() {
        return (
            <div className="categories-div">
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={this.handleBackButton}
                            className="category-button"
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            id="outlined-basic"
                            label="Category"
                            style={{ width: "100%" }}
                            variant="outlined"
                            onChange={this.handleCategoryChange}
                            value={this.props.currentCategory}
                            onKeyDown={this.handleKeyPressed}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant="contained"
                            color={_.isNumber(this.props.editIndex) ? "primary" : "secondary"}
                            className="category-button"
                            startIcon={<SaveOutlinedIcon />}
                            onClick={this.handleSaveCategory}
                            disabled={!this.props.currentCategory.length > 0}
                        >

                            {_.isNumber(this.props.editIndex) ? "Update" : "Save"}
                        </Button>
                    </Grid>

                    {this.props.isReview ? <CurrentAddon /> : ''}

                    <Grid item xs={12}>
                        <TableContainer >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Category</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.categories && this.props.categories.map((category, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {category}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" style={{ marginRight: "10px" }} startIcon={<DeleteForeverOutlinedIcon />}
                                                    onClick={this.handleDelete.bind(this, index)}
                                                >
                                                    Delete</Button>
                                                {
                                                    this.props.withAddons && category in this.props.withAddons && <Button variant="contained" color="secondary" style={{ marginRight: "10px" }} startIcon={<VisibilityOutlinedIcon />}
                                                        onClick={this.handleList.bind(this, index)}
                                                    >
                                                        View add-ons
                                                        </Button>
                                                }

                                                <Button variant="contained" color="primary" startIcon={<EditOutlinedIcon />}
                                                    onClick={this.handleEdit.bind(this, index)}
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination count={this.props.totalPages} page={this.props.currentPage} onChange={this.handlePageChange} />
                        </TableContainer>
                    </Grid>
                </Grid>
            </div >
        )
    }
}

const mapDispatchToProps = {
    setCurrentCategory,
    setCategories,
    setMenuType,
    setEditIndex,
    setTotalCategories,
    loadCategories,
    loadNewPageC,
    setSelectedCategories,
    setSidebarType,
    setSelectedCategory
}

const mapStateToProps = (state) => ({
    currentCategory: state.categories.currentCategory,
    categories: state.categories.pageCategories,
    editIndex: state.categories.editIndex,
    totalPages: state.categories.totalPages,
    currentPage: state.categories.currentPage,
    allCategories: state.categories.categories,
    selectedCategories: state.categories.selectedCategories,
    withAddons: state.categories.withAddons,
    isReview: state.notes.canCreateNote,
    title: state.currentAddon.title
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories);