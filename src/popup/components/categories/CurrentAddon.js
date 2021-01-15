import React from "react";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { setWithAddons, setSelectedCategories } from '../../../redux/modules/categories/actions';
import Grid from '@material-ui/core/Grid';
import { sendToBackground } from "../../../utils/helpers";
import { SAVE_TO_STORAGE } from "../../../utils/constants";
import _ from "lodash";


class CurrentAddon extends React.Component {

    handleSelectChange = (event) => {
        // for each selected category
        // add the title of the add-on
        let withAddons = this.props.withAddons ?? {};
        let previousSelected = this.props.selectedCategories;
        let selectedCategories = event.target.value;
        let diff = _.difference(previousSelected, selectedCategories);

        let addAddons;
        selectedCategories.forEach(category => {
            if (!withAddons[category]) { // category does not exists in addon
                addAddons = [this.props.title];
            } else if (withAddons[category].indexOf(this.props.title) < 0) { // category exists but does not have addon
                addAddons = withAddons[category];
                addAddons.push(this.props.title);
            } else { //category exists and has addon => remains the same
                addAddons = withAddons[category];
            }
            addAddons = addAddons.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
            withAddons[category] = addAddons
        });


        diff.length > 0 && diff.forEach(category => {
            addAddons = withAddons[category];
            addAddons.splice(addAddons.indexOf(this.props.title), 1)
            if (addAddons.length > 0)
                withAddons[category] = addAddons;
            else
                delete withAddons[category]
        })

        this.props.setSelectedCategories(selectedCategories);
        this.props.setWithAddons(withAddons);
        sendToBackground(SAVE_TO_STORAGE, { 'withAddons': withAddons });
    }

    render() {
        return (
            <Grid item xs={12}>
                <Card >
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Add categories to {this.props.title}
                        </Typography>
                        {
                            this.props.allCategories ?
                                <FormControl style={{ width: '100%' }}>
                                    <InputLabel id="demo-mutiple-checkbox-label">Categories</InputLabel>
                                    <Select
                                        labelId="demo-mutiple-checkbox-label"
                                        id="demo-mutiple-checkbox"
                                        multiple
                                        value={this.props.selectedCategories}
                                        onChange={this.handleSelectChange}
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                        style={{ width: '100%' }}
                                    >
                                        {this.props.allCategories.map((category, index) => (
                                            <MenuItem key={index} value={category.name} style={{ width: '100%' }} >
                                                <Checkbox
                                                    checked={this.props.selectedCategories.indexOf(category.name) > -1}
                                                />
                                                <ListItemText primary={category.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                : ''

                        }
                    </CardContent>
                </Card>


            </Grid>

        )
    }
}

const mapDispatchToProps = {
    setWithAddons,
    setSelectedCategories
}

const mapStateToProps = (state) => ({
    title: state.currentAddon.title,
    allCategories: state.categories.categories,
    selectedCategories: state.categories.selectedCategories,
    withAddons: state.categories.withAddons
})


export default connect(mapStateToProps, mapDispatchToProps)(CurrentAddon);