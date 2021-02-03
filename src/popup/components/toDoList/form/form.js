import React from 'react';

import './form.css';

export const Form = ({ onSubmit, urlValue, nameValue, handleNameChange, handleUrlChange }) => {
    return (
    <form onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input 
                className="form-control" 
                id="name"
                value={nameValue}
                onChange={handleNameChange} 
            />
        </div> 
      
        <div className="form-group">
            <label htmlFor="email">URL:  </label>
            <input 
                type="url" 
                className="form-control" 
                id="url"
                placeholder="https://example.com"
                value={urlValue}
                onChange={handleUrlChange} 
            />
        </div>

        <div className="form-group">
            <button className="form-control btn btn-primary" type="submit">
                Submit
            </button>
        </div>
    </form>
    );
};

export default Form;