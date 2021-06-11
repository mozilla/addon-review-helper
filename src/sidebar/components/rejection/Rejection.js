import React from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import { setSidebarType, setSidebarContent } from "../../../redux/modules/sidebar/actions"
import { getNameFromURL } from "../../../utils/helpers";
import Parser from 'html-react-parser';
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

class Rejection extends React.Component {

    constructor() {
        super();
        this.state = {
            issues: [],
            selectedIssues: []
        }
    }

    componentDidMount() {
        console.log('categories', this.props.categories)
        let issues = this.props.categories.filter(category => category.issue)
        this.setState({
            issues
        })
        console.log("issues", issues)
    }

    handleChange = (event) => {
        this.setState({
            selectedIssues: event.target.value
        })
        console.log("change", event.target.value)
    }

    render() {
        let selected = this.state.selectedIssues;
        return (
            <div>
                <Box>
                    <h4>{getNameFromURL(this.props.title)}</h4>
                    <TextareaAutosize
                        className='note-textarea'
                        aria-label="minimum height"
                        rowsMax={20}
                        // onChange={this.handleContentChange}
                        defaultValue={this.props.content}
                        disabled={true}
                    />

                    <FormControl style={{ width: "90%", marginLeft: "10px" }}>
                        <InputLabel id="demo-mutiple-chip-label">Select issues for this add-on</InputLabel>
                        <Select
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                            value={this.state.selectedIssues}
                            onChange={this.handleChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div >
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </div>
                            )}
                        >
                            {this.state.issues.map((issue) => (
                                <MenuItem key={issue.name} value={issue.name} >
                                    {issue.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </div>
        )
    }
}


const mapDispatchToProps = {
    setSidebarType,
    setSidebarContent,
};

const mapStateToProps = (state) => ({
    title: state.sidebar.title,
    content: state.sidebar.content,
    categories: state.categories.categories
});

export default connect(mapStateToProps, mapDispatchToProps)(Rejection);