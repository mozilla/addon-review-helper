import React from 'react';

const AddButton = ({ showModal }) => {
    return (
        <>
            <button
                className="btn btn-lg btn-danger center modal-button"
                onClick={showModal}
            >
            Add Add-on
            </button>
        </>
    );
};
    
export default AddButton;
