import React from "react";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./Categories.css";
import Grid from '@material-ui/core/Grid';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { setCurrentCategory, setCategories, setEditIndex } from "../../../redux/modules/categories/actions"
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

class Categories extends React.Component {

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

            this.props.setCategories(categories);
            sendToBackground(SAVE_TO_STORAGE, { 'categories': categories })
            this.props.setCurrentCategory('')
        }
    }

    handleDelete = (index) => {
        var categories = this.props.categories;
        delete categories[index];
        var newCategories = _.isEmpty(categories) ? [] : categories;
        sendToBackground(SAVE_TO_STORAGE, { 'categories': newCategories })
        this.props.setCategories(newCategories);
    }

    handleEdit = (index) => {
        var category = this.props.categories[index];
        this.props.setCurrentCategory(category);
        this.props.setEditIndex(index);
    }

    render() {
        return (
            <div className="categories-div">
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <TextField
                            id="outlined-basic"
                            label="Category"
                            style={{ width: "100%" }}
                            variant="outlined"
                            onChange={this.handleCategoryChange}
                            value={this.props.currentCategory}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            color={_.isNumber(this.props.editIndex) ? "primary" : "secondary"}
                            className="category-button"
                            startIcon={<SaveOutlinedIcon />}
                            onClick={this.handleSaveCategory}
                            disabled={!this.props.currentCategory.length > 0}
                        >

                            {_.isNumber(this.props.editIndex)    ? "Update" : "Save"}
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
                                    {this.props.categories && this.props.categories.map((category, i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">
                                                {category}
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
    setEditIndex
}

const mapStateToProps = (state) => ({
    currentCategory: state.categories.currentCategory,
    categories: state.categories.categories,
    editIndex: state.categories.editIndex
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories);