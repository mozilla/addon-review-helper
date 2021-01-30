import React from 'react';

import './addOnItem.css';

const AddOnItem = ({text}) => {
    return (
        
          <div className="addon-item">
              {text}
          </div>
    );
};
    
export default AddOnItem;