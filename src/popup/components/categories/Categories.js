import React from "react";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./Categories.css";
import Grid from '@material-ui/core/Grid';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { setCurrentCategory, setCategories, setEditIndex, setTotalCategories, loadCategories, loadNewPageC } from "../../../redux/modules/categories/actions"
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

class Categories extends React.Component {

    componentDidMount = () => {
        this.props.loadCategories()
    }

    handleCategoryChange = (event) => {
        this.props.setCurrentCategory(event.target.value)
    }

    handleSaveCategory = () => {
        if (this.props.currentCategory.length > 0) {
            console.log("Categories:", this.props.categories)
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
        console.log("PAGE", value)
        this.props.loadNewPageC(value)
    }

    handleKeyPressed = (e) => {
        if (e.keyCode === 13) {
            this.handleSaveCategory();
        }
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
                                    {this.props.categories && Object.keys(this.props.categories).map((i, category) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">
                                                {this.props.categories[i]}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" style={{ marginRight: "10px" }} startIcon={<DeleteForeverOutlinedIcon />}
                                                    onClick={this.handleDelete.bind(this, i)}
                                                >
                                                    Delete</Button>
                                                <Button variant="contained" color="primary" startIcon={<EditOutlinedIcon />}
                                                    onClick={this.handleEdit.bind(this, i)}
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
    loadNewPageC
}

const mapStateToProps = (state) => ({
    currentCategory: state.categories.currentCategory,
    categories: state.categories.pageCategories,
    editIndex: state.categories.editIndex,
    totalPages: state.categories.totalPages,
    currentPage: state.categories.currentPage,
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories);