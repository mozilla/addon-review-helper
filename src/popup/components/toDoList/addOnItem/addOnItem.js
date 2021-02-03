import React from 'react';

import './addOnItem.css';

const AddOnItem = ({text, onClick}) => {
    return (
        
          <div className="addon-item" onClick={onClick}>
              {text}
          </div>
    );
};
    
export default AddOnItem;