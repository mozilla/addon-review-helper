import React from 'react';

import './form.css';

export const Form = ({ onSubmit }) => {
    return (
    <form onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input className="form-control" id="name" />
        </div> 
      
        <div className="form-group">
            <label htmlFor="email">URL:  </label>
            <input type="url" className="form-control" id="url"
                placeholder="https://example.com" 
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