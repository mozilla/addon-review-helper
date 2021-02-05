import React from 'react';

import './addOnItem.css';
const onClickggg= () => {
    console.log('x bddd ddd ddd');
}

const AddOnItem = ({text, onClick, removeAddon}) => {
    return (
        <div className="addon-section">
            <div className="addon-item" onClick={onClick}>
              {text}
             
            </div>
            <div 
                className="close-addon"
                onClick={removeAddon}
            > 
            </div>
        </div>  
    );
};
    
export default AddOnItem;