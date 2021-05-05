import React from "react";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./Categories.css";
import Grid from '@material-ui/core/Grid';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { setCurrentCategory, setCategories, setEditIndex, setSelectedCategories, setWithAddons } from "../../../redux/modules/categories/actions"
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
import _, { indexOf } from "lodash";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Pagination from '@material-ui/lab/Pagination';
import CurrentAddon from "./CurrentAddon";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { setSidebarType, setSelectedCategory } from "../../../redux/modules/sidebar/actions";
import { CATEGORY_ADDONS } from "../../../redux/modules/sidebar/types";
import { loadPage, loadItems } from "../../../utils/helpers";
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function random_color() {
    return Math.floor(Math.random() * 16777215).toString(16);
}
class Categories extends React.Component {

    constructor() {
        super();
        const perPage = 5;
        this.state = {
            pageCategories: [],
            perPage,
            currentCount: perPage,
            totalCategories: null,
            currentPage: 1,
            totalPages: 1,
            displayColorPicker: false,
            categoryToChange: null,
            issuesChecked: false
            
        }
    }

    handleChangeColorClick = (category, color) => {
        this.setState({ 
            categoryToChange: category,
            color: color,
            displayColorPicker: !this.state.displayColorPicker 
        })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        console.log("ON CHANGE")
        this.setState({ color: color.hex })
    };

    handleChangeColorComplete = (color, event) => {
        console.log("COMPLETE CHANGE")
        let categories = this.props.categories;
        categories.forEach(category => {
            if (category.name === this.state.categoryToChange) {
                category.color = color.hex
            }
        })
       
        this.props.setCategories(categories);
        sendToBackground(SAVE_TO_STORAGE, { 'categories': categories })
        this.setState({ color: color.hex })
        this.handlePageChange(null, this.state.currentPage);
    }

    loadFirstPage = (categories) => {
        let totalCategories = categories.length;
        let perPage = this.state.perPage;
        let pageCategories = loadItems(categories, 0, perPage);
        let totalPages = Math.ceil(totalCategories / perPage);

        this.setState({
            pageCategories,
            totalCategories,
            totalPages,
            currentPage: 1,
            currentCount: perPage
        })
    }

    componentDidMount = () => {
        this.loadFirstPage(this.props.categories);

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
                categories[this.props.editIndex].name = this.props.currentCategory;
                categories[this.props.editIndex].issue = this.state.issuesChecked; 
                this.props.setEditIndex(null);
            } else {
                categories.push({
                    name: this.props.currentCategory,
                    color: '#' + random_color(),
                    issue: this.state.issuesChecked
                });
            }

            categories = categories.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))
            this.props.setCategories(categories);
            sendToBackground(SAVE_TO_STORAGE, { 'categories': categories })
            this.props.setCurrentCategory('')
            this.setState({
                issuesChecked: false
            })

            //pagination

            this.loadFirstPage(categories);

        }
    }

    handleDelete = (name) => {
        let categories = this.props.categories;
        let indexOfCategory;
        categories.forEach((category, index) => {
            if (category.name === name) {
                indexOfCategory = index;
            }
        });
        //delete from withAddons
        if (this.props.withAddons && this.props.withAddons[name]) {
            let withAddons = this.props.withAddons;
            delete withAddons[name];
            this.props.setWithAddons(withAddons);
            sendToBackground(SAVE_TO_STORAGE, { 'withAddons': withAddons });
        }
        categories.splice(indexOfCategory, 1)
        var newCategories = _.isEmpty(categories) ? [] : categories;
        sendToBackground(SAVE_TO_STORAGE, { 'categories': newCategories })
        this.props.setCategories(newCategories);
        this.loadFirstPage(categories);

    }

    handleEdit = (name) => {
        let indexOfCategory;

        this.props.categories.some((category, index) => {
            if(category.name === name){
                indexOfCategory = index;
                if(category.issue)
                    this.setState({
                        issuesChecked: true
                    })

            }
        })

        this.props.setCurrentCategory(name);
        this.props.setEditIndex(indexOfCategory);
    }

    handleBackButton = () => {
        this.props.setMenuType(MENU)
    }

    handlePageChange = (event, page) => {
        let results = loadPage(
            this.props.categories,
            page,
            this.state.perPage
        )

        this.setState({
            pageCategories: results.pageItems,
            currentPage: results.currentPage,
            currentCount: results.currentCount,
            issuesChecked: false
        })
    }

    handleKeyPressed = (e) => {
        if (e.keyCode === 13) {
            this.handleSaveCategory();
        }
    }

    handleList = (name) => {
        browser.sidebarAction.close()
        this.props.setSelectedCategory(name)
        this.props.setSidebarType(CATEGORY_ADDONS);
        browser.sidebarAction.open()
    }

    handleIssueChange = () => {
        this.setState({
            issuesChecked: !this.state.issuesChecked
        })
    }

    render() {
        const styles = reactCSS({
            'default': {
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div className="categories-div">
                <Grid container spacing={4}>
                    <Grid item xs={2}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={this.handleBackButton}
                            className="category-button"
                        >
                            Back
                        </Button>
                    </Grid>
                   
                    <Grid item xs={6}>
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
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={this.state.issuesChecked}
                                onChange={this.handleIssueChange}
                                name="checkedB"
                                color="primary"
                            />
                            }
                            label="Issue"
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
                                    {
                                    this.state.displayColorPicker ? <div style={styles.popover}>
                                        <div style={styles.cover} onClick={this.handleClose} />
                                            <SketchPicker color={this.state.color} onChange={this.handleChange} onChangeComplete={this.handleChangeColorComplete} />
                                        </div>
                                     : null
                                     }
                                    {this.state.pageCategories && this.state.pageCategories.map((category, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {category.name}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" style={{
                                                    background: category.color
                                                }} onClick={this.handleChangeColorClick.bind(this, category.name, category.color)}>
                                                    Change Color
                                                </Button>

                                                <Button variant="contained" style={{ marginRight: "10px" }} startIcon={<DeleteForeverOutlinedIcon />}
                                                    onClick={this.handleDelete.bind(this, category.name)}
                                                >
                                                    Delete</Button>
                                                {
                                                    this.props.withAddons && category.name in this.props.withAddons && <Button variant="contained" color="secondary" style={{ marginRight: "10px" }} startIcon={<VisibilityOutlinedIcon />}
                                                        onClick={this.handleList.bind(this, category.name)}
                                                    >
                                                        View add-ons
                                                        </Button>
                                                }

                                                <Button variant="contained" color="primary" startIcon={<EditOutlinedIcon />}
                                                    onClick={this.handleEdit.bind(this, category.name)}
                                                >
                                                    Edit
                                                </Button>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination count={this.state.totalPages} page={this.state.currentPage} onChange={this.handlePageChange} />
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
    setSelectedCategories,
    setSidebarType,
    setSelectedCategory,
    setWithAddons
}

const mapStateToProps = (state) => ({
    currentCategory: state.categories.currentCategory,
    editIndex: state.categories.editIndex,
    categories: state.categories.categories,
    selectedCategories: state.categories.selectedCategories,
    withAddons: state.categories.withAddons,
    isReview: state.notes.canCreateNote,
    title: state.currentAddon.title
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories);