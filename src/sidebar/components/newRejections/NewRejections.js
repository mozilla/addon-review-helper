import React from "react";
import { connect } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { getNameFromURL } from "../../../utils/helpers";

class NewRejections extends React.Component {

    setList = () => {
        let items = Object.keys(this.props.newRejections).map((data, i) => {
            return (
                <div key={data + 1}>
                    <ListItem
                        key={data}
                        style={{ cursor: "pointer" }}
                        onClick={this.handleListClick.bind(this, this.props.newRejections[data])}
                    >
                        <ListItemText
                            primary={getNameFromURL(this.props.newRejections[data].addonUrl)}
                        >
                        </ListItemText>
                    </ListItem>
                </div>
            )
        })

        return items;
    }

    render() {
        return (
            <List>
                {
                    this.setList()
                }
            </List>
        )
    }
}

const mapStateToProps = (state) => ({
    newRejections: state.rejections.newRejections
})

export default connect(mapStateToProps, null)(NewRejections);