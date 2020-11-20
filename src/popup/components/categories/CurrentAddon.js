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


class CurrentAddon extends React.Component {

    handleSelectChange = (event) => {
        // for each selected category
        // add the title of the add-on
        let withAddons = this.props.withAddons ?? [];
        let selectedCategories = event.target.value;
        console.log("withAddons: ", withAddons)
        selectedCategories.forEach(category => {
            console.log("category", withAddons[category])
            if (!withAddons[category]) {
                withAddons[category] = []
                withAddons[category].push(this.props.title)
            } else if(withAddons[category].indexOf(this.props.title) < 0) {
                withAddons[category].push(this.props.title)
            }
        });

        console.log("withAddons", withAddons)
        this.props.setSelectedCategories(selectedCategories);
        this.props.setWithAddons(withAddons);
        sendToBackground(SAVE_TO_STORAGE, { 'withAddons': withAddons});
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
                                    {this.props.allCategories.map((category) => (
                                        <MenuItem key={category} value={category} style={{ width: '100%' }} >
                                            <Checkbox
                                                checked={this.props.selectedCategories.indexOf(category) > -1}
                                            />
                                            <ListItemText primary={category} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            : ''

                    }
                </CardContent>
            </Card>


        </Grid>

        )}
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