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

class CategoryAddons extends React.Component {

    setList = () => {
        let items = this.props.withAddons[this.props.selectedCategory].map((addon, i) => {
            console.log("addon", addon)
            return (
                <ListItem key={i}>
                    <ListItemText primary={addon} ></ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={this.handleDeleteButton.bind(this, i)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>

                </ListItem>
            )
        });

        return items;
    }

    handleDeleteButton = (index) => {
        let withAddons = this.props.withAddons;
        withAddons[this.props.selectedCategory].splice(index, 1);
        this.props.setWithAddons(withAddons);
        sendToBackground(SAVE_TO_STORAGE, { 'withAddons': withAddons });

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