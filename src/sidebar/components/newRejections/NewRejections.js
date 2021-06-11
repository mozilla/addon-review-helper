import React from "react";
import { connect } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { getNameFromURL } from "../../../utils/helpers";
import { setSidebarType, setSidebarTitle, setSidebarContent, setCurrentPage, setOrderBy, setSearchBy } from "../../../redux/modules/sidebar/actions"
import { REJECTION } from "../../../redux/modules/sidebar/types"

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
''
        return items;
    }

    handleListClick = (data) => {
        console.log("data", data)
        this.props.setSidebarTitle(data.addonUrl);
        this.props.setSidebarContent(data.review);
        this.props.setSidebarType(REJECTION);
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

const mapDispatchToProps = {
    setSidebarType,
    setSidebarTitle,
    setSidebarContent
}

const mapStateToProps = (state) => ({
    newRejections: state.rejections.newRejections
})

export default connect(mapStateToProps, mapDispatchToProps)(NewRejections);