import React from "react";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import "./CategoryAddons.css"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { setWithAddons } from "../../../redux/modules/categories/actions";
import { SAVE_TO_STORAGE } from "../../../utils/constants";
import { sendToBackground } from "../../../utils/helpers";
import Pagination from '@material-ui/lab/Pagination';
import { loadPage, loadItems } from "../../../utils/helpers";

class CategoryAddons extends React.Component {

    constructor() {
        super();
        const perPage = 18
        this.state = {
            pageAddons: [],
            perPage,
            currentCount: perPage,
            totalAddons: null,
            currentPage: 1,
            totalPages: 1
        }
    }

    componentDidMount = () => {
        let addons = this.props.withAddons[this.props.selectedCategory];
        let totalAddons = addons.length;
        let pageAddons = loadItems(addons, 0, this.state.perPage);
        let totalPages = Math.ceil(totalAddons / this.state.perPage);

        this.setState({
            pageAddons,
            totalAddons,
            totalPages
        })
    }

    handlePageChange = (event, page) => {
        let results = loadPage(
            this.props.withAddons[this.props.selectedCategory],
            page,
            this.state.perPage
        )

        this.setState({
            pageAddons: results.pageItems,
            currentPage: results.currentPage,
            currentCount: results.currentCount
        })
    }


    handleDeleteButton = (addon, index) => {
        let withAddons = this.props.withAddons;
        let pageAddons = this.state.pageAddons;
        let categoryAddons = withAddons[this.props.selectedCategory];
        withAddons[this.props.selectedCategory].splice(categoryAddons.indexOf(addon), 1);
        pageAddons.splice(index, 1);
        if (withAddons[this.props.selectedCategory].length === 0) {
            delete withAddons[this.props.selectedCategory];
        } else if (pageAddons.length === 0) {
            pageAddons = loadItems(withAddons[this.props.selectedCategory], 0, this.state.perPage)
            let totalAddons = withAddons[this.props.selectedCategory].length;
            let totalPages = Math.ceil(totalAddons / this.state.perPage);
            this.setState({
                totalAddons,
                totalPages
            })
        }
        this.setState({
            pageAddons
        })
        this.props.setWithAddons(withAddons);
        sendToBackground(SAVE_TO_STORAGE, { 'withAddons': withAddons });
    }

    setList = () => {
        let items = this.state.pageAddons && this.state.pageAddons.map((addon, i) => {
            return (
                <ListItem key={i}>
                    <ListItemText primary={addon} ></ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={this.handleDeleteButton.bind(this, addon, i)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        });

        return items;
    }


    render() {
        return (
            <div className="categories-div">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h3> {this.props.selectedCategory}'s Add-ons </h3>
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            {this.setList()}
                        </List>
                        <Pagination count={this.state.totalPages} page={this.state.currentPage} onChange={this.handlePageChange} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = {
    setWithAddons
}

const mapStateToProps = (state) => ({
    withAddons: state.categories.withAddons,
    selectedCategory: state.sidebar.selectedCategory
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAddons);