import React, { useState } from 'react';
import { connect } from "react-redux";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddCircle from '@material-ui/icons/AddCircle';
import {getCurrentURL, getNameFromURL} from '../../../utils/helpers';
import {addAddon} from '../../../redux/modules/toDoList/actions.js';

import './addAddon.css';

const AddAddon = ({toDoList, addAddon}) => {
      const [anchorEl, setAnchorEl] = useState(null);

      console.log(toDoList, 'toDoList');
      console.log('location', window.location.href);

      const handleClick = event => setAnchorEl(event.currentTarget);

      const handleClose = () => setAnchorEl(null);

      const handleClickItem = async (key) => {
            const url = await getCurrentURL();
            const namefromURL =  getNameFromURL(url);
            console.log('get name from url', namefromURL);
            addAddon({name: namefromURL, url: url, key: Date.now()}, key);

           handleClose();
      }

      return (
          <div className="addon-button">
            <Button 
                  aria-controls="simple-menu" 
                  aria-haspopup="true" 
                  onClick={handleClick}
                  disabled={toDoList.length===0}
            >
                  <AddCircle />Add Add-on to
            </Button> 
            <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={()=> setAnchorEl(null)}
            >     
                  {toDoList.length!==0 && 
                        toDoList.map(category => 
                        <MenuItem 
                              onClick={()=> handleClickItem(category.key)}
                              key={category.key}
                        >
                              {category.text}
                        </MenuItem>)}
                  
            </Menu>
           </div>     
    );
};

const mapStateToProps = state => {
      return {
      toDoList: state.toDoList.toDoList}
  };

  const mapDispatchToProps = dispatch => {

      return {
          addAddon: (input, key) => dispatch(addAddon(input, key)),
      }
  };  
    
export default connect(mapStateToProps, mapDispatchToProps)(AddAddon);